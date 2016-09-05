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

Register.createAppointment = function (appointmentReq, callback) {
    
//    logger.debug("appointment", "general",  JSON.stringify(appointmentReq));
    
    var validation = validator.validateAppointmentRegistration(appointmentReq);

    if(validation.isValid) {
        
//        db.query(config.couchbase.buckets.profiles, queries.appointment.get_user_using_mobile, [appointmentReq.user.mobile])
//        .then(function (result) {
//            
//            var user;
//            var token = utils.generateToken();
//            
//            if (!utils.isEmpty(result[0])) {
//                // user exists already 
//                user = result[0][0];
//                logger.debug("appointment", "general",  JSON.stringify(user));
//                return callback(200, user);
//                
//            } else {
//                logger.debug("appointment", "general", "creating new profile");
//                
//                var key = uuid.v4();
//                appointmentReq.user.type = 'kip';
//                
//                db.insert(config.couchbase.buckets.profiles, key, appointmentReq.user, function (error, result) {
//                    if(error) {
//                        //db error
//                        logger.error("appointment", "DB",  appointmentReq + ' : ' + error);
//                        return callback(500, {type: 'db', message: message.support.contact_support});
//                    } else if (result) {
//                        user = appointmentReq.user;
//                        return callback(200, user);
//                    }
//                });
//            }
//        }, function (error) {
//            //db error
//            logger.error("appointment", "DB",  appointment + ' : ' + error);
//            return callback(500, {type: 'db', message: message.support.contact_support});
//        }).catch(function (error) {
//            //q error
//            logger.error("appointment", "q",  appointment + ' : ' + error.stack);
//            return callback(500, {type: 'q', message: message.support.contact_support});
//        });
        
        
        this.updateKipenziDetails(appointmentReq.kipenzis, function (status, result) {
            callback(status, result);
        });
       
    } else {
        return callback(403, {type: 'validation', error: validation.error, message: message.appointment.registration.validation});
    }
    
};

Register.updateKipenziDetails = function(kipenzis, callback) {
    
    var kipenzisForBulk = {};
    
    for (var kipenzi in kipenzis) {
        if(!kipenzi.id) {
            kipenzisForBulk[uuid.v4()] = kipenzis[kipenzi];
        }
    }
    
    db.bulkInsertTransaction(config.couchbase.buckets.profiles, kipenzisForBulk, function (error, result) {
        if(error) {
            //db error
            logger.error("appointment", "DB",  'bulk insert failed ');
            return callback(500, {type: 'db', message: message.support.contact_support});
        } else if (result) {
            // inserted new kipenzis
            logger.info("appointment", "DB", "inserted the kipenzis" + JSON.stringify(result));
            return callback(200, result);
        }
    });
};