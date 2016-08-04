'use strict';

var q       = require('q');
var console = require('console');

var config  = require('../../config');
var utils   = require('../utils/utils');
var db      = require('../../db/couchbase');
var queries = require('../../db/couch-queries');

function LoginUtil() {};

module.exports = LoginUtil;

LoginUtil.login = function (username, password, done) {
    
    var query = queries.login;
    var pwd = utils.generateHash(password);
    
    db.query(config.couchbase.buckets.user_store, query, [username, pwd])
        .then(function (result) {
            if (!utils.isEmpty(result[0])) {
                //valid user
                var user = function () {
                    this.details = result[0][0];
                }
                var userObj = new user();
                return done(null, userObj);
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