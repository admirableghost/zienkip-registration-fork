'use strict';

var q           = require('q');
var console     = require('console');
var passport    = require('passport');
var uuid        = require('uuid');

var config      = require('../../config');
var db          = require('../../db/couchbase');
var queries     = require('../../db/couch-queries');
var message     = require('../../message');
var userSchema  = require('../auth/user');
var logger      = require('../utils/logger');
var utils       = require('../utils/utils');
var validator   = require('../validator/validator');

function Register() {};

module.exports = Register;

Register.createAppointment = function (appointment, callback) {
    
    logger.debug("appointment", "general",  JSON.stringify(appointment));
    
    var validation = validator.validateAppointmentRegistration(appointment);
//    return callback(200, appointment);
    if(validation.isValid) {
        
        db.query(config.couchbase.buckets.profiles, queries.appointment.get_user_using_mobile, [appointment.user.mobile])
        .then(function (result) {
            
            var user;
            if (!utils.isEmpty(result[0])) {
                //valid user
                user = result[0][0];
                user.token = 23;
                logger.debug("appointment", "general",  JSON.stringify(user));
                return callback(200, user);
                
            } else {
                logger.debug("appointment", "general", "creating new profile");
                
                var key = uuid.v4();
                appointment.user.type = 'kip';
                
                db.insert(config.couchbase.buckets.profiles, key, appointment.user, function (error, result) {
                    if(error) {
                        //db error
                        logger.error("appointment", "DB",  appointment + ' : ' + error);
                        return callback(500, {type: 'db', message: message.support.contact_support});
                    } else if (result) {
                        user.token = 45;
                        return callback(200, user);
                    }
                });
            }
        }, function (error) {
            //db error
            logger.error("appointment", "DB",  appointment + ' : ' + error);
            return callback(500, {type: 'db', message: message.support.contact_support});
        }).catch(function (error) {
            //q error
            logger.error("appointment", "q",  appointment + ' : ' + error.stack);
            return callback(500, {type: 'q', message: message.support.contact_support});
        });  
       
    } else {
        return callback(403, {type: 'validation', error: validation.error, message: message.appointment.registration.validation});
    }
    
};

Register.addKipenzi = function() {
    
}