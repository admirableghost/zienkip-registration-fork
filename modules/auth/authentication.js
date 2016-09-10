'use strict';

var q           = require('q');
var console     = require('console');
var passport    = require('passport');

var config      = require('../../config');
var db          = require('../../db/couchbase');
var queries     = require('../../db/couch-queries');
var message     = require('../../message');
var userSchema  = require('../auth/user');
var logger      = require('../utils/logger');
var utils       = require('../utils/utils');

function AuthUtil() {};

module.exports = AuthUtil;

// Logs the user in
// 1. checks if the creds are valid
// 2. gets the profile uuid and gets user details
// 3. loads the menus
AuthUtil.login = function (username, password, done) {
    
    logger.info("login", "general",  "user : " + username);
    
    var pwd = utils.generateHash(password);
    var user;
    
    db.query(config.couchbase.buckets.profiles, queries.user.cred_check, [username, pwd])
        .then(function (result) {
            if (!utils.isEmpty(result[0])) {
                //valid user
                logger.info("login", "general",  "validating user : " + username + " : " + result[0][0].uuid);
                
                db.query(config.couchbase.buckets.profiles, queries.user.get_user_using_uuid, [result[0][0].uuid])
                    .then(function (result) {
                        if (!utils.isEmpty(result[0])) {
                            // valid uuid 
                            logger.info("login", "general",  "valid user : " + username);
                            user = result[0][0];
                            
                            db.query(config.couchbase.buckets.global_static, queries.menu.get_menus, [config.app_db_key, "menu", user.type, user.role])
                                .then(function (result) {
                                    if (!utils.isEmpty(result[0])) {
                                        //load menus
                                        logger.info("login", "general",  "loaded menus for user : " + username);
                                        user.menus = result[0];
                                        return done(null, user);
                                    } else {
                                        logger.warn("login", "general",  "Unable to load menus for user :" + username);
                                        return done(null, false, {message: message.support.contact_support});
                                    }
                                }, function (error) {
                                    //db error
                                    logger.error("login", "DB",  username + ' : ' + error);
                                    return done(null, false, {status: false, type: 'db', message: message.support.contact_support});
                                });
                            
                        } else {
                            logger.warn("login", "setup",  "UUID not found :" + username + ' : ' + result[0][0].uuid);
                            return done(null, false, {message: message.login.invalid_username_pwd});
                        }
                    }, function (error) {
                        //db error
                        logger.error("login", "DB",  username + ' : ' + error);
                        return done(null, false, {status: false, type: 'db', message: message.support.contact_support});
                    });
                
            } else {
                logger.info("login", "general",  username + ' invalid username / pwd');
                return done(null, false, {message: message.login.invalid_username_pwd});
            }
        }, function (error) {
            //db error
            logger.error("login", "DB",  username + ' : ' + error);
            return done(null, false, {status: false, type: 'db', message: message.support.contact_support});
        }).catch(function (error) {
            //q error
            logger.error("login", "q",  username + ' : ' + error.stack);
            return done(null, false, {status: false, type: 'q', message: message.support.contact_support});
        });
};

// local authentication
AuthUtil.authenticateLogin = function (req, res) {
    passport.authenticate('local', function (err, user, info) {
        
        var token;
        if (err) {
            console.log(err);
            // If Passport throws/catches an error
            res.status(404).json(message.login.invalid_username_pwd);
            return;
        }
        // If a user is found
        if (user) {
            var obj = new userSchema();
            token = obj.generateJwt(user);
            var tokenArray = token.split(".");
            res.status(200);
//            utils.addCookies(req, res, {h: tokenArray[0], p: tokenArray[1], s: tokenArray[2], u: user.uuid})
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};

AuthUtil.routingAuth = function() {
    var userSchemaObj   = new userSchema();
    return userSchemaObj.auth;
};