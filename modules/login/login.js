'use strict';

var q           = require('q');
var console     = require('console');
var passport    = require('passport');

var config      = require('../../config');
var utils       = require('../utils/utils');
var db          = require('../../db/couchbase');
var queries     = require('../../db/couch-queries');
var userSchema  = require('../login/user');

function LoginUtil() {};

module.exports = LoginUtil;

LoginUtil.login = function (username, password, done) {
    
    var query = queries.login;
    var pwd = utils.generateHash(password);
    
    db.query(config.couchbase.buckets.user_store, query, [username, pwd])
        .then(function (result) {
            if (!utils.isEmpty(result[0])) {
                //valid user
                return done(null, result[0][0]);
            } else {
                console.log(username + ' invalid username / pwd')
                return done(null, false, {message: 'User name or password is wrong'});
            }
        }, function (error) {
            //db error
            console.log(username + ' : ' + error);
            return done(null, false, {status: false, type: 'db', message: 'please contact support'});
        }).catch(function (error) {
            //q error
            console.log(username + ' : ' + error.stack);
            return done(null, false, {status: false, type: 'q', message: 'please contact support'});
        });
};

LoginUtil.authenticateLogin = function (req, res) {
    passport.authenticate('local', function (err, user, info) {
        
        var token;
        if (err) {
            console.log(err);
            // If Passport throws/catches an error
            res.status(404).json("eror passport");
            return;
        }
        // If a user is found
        if (user) {
            var obj = new userSchema();
            token = obj.generateJwt(user);
            var tokenArray = token.split(".");
            res.status(200);
            utils.addCookies(req, res, {h: tokenArray[0], p: tokenArray[1], s: tokenArray[2], u: user.uuid})
            res.json({
                "token": token,
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};