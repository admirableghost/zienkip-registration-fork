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
var validator   = require('../validator/validator');

function Register() {};

module.exports = Register;

// creates / updates the user details and registers an appointment
Register.createAppointment = function (appointmentReq, callback) {
    
    var date1 = new Date();
    
    logger.debug("appointment", "general",  JSON.stringify(appointmentReq));
    
    var validation = validator.validateAppointmentRegistration(appointmentReq);

    if(validation.isValid) {
        
        // gets the existing details of the user
        this.getUserAndPetDetails(appointmentReq.user.mobile, function (user_and_pet_details, error){
            if(error) {
                return callback(403, error);
            }
            
            var profiles    = appointmentReq.kipenzis;
            var user        = appointmentReq.user;
            
            var profilesForBulk = {};
            
            user.uuid       = user.uuid     || user.mobile;
            user.type       = user.type     || "kip";
            user.kipenzis   = user.kipenzis || [];
            
            if(user_and_pet_details) {
                user.kipenzis   = user_and_pet_details.user.kipenzis; 
            }
            
            // assigns a uuid to profiles without one and retains the uuid for existing
            for (var profile in profiles) {
                
                profiles[profile].type = profiles[profile].type || "kipenzi";
                profiles[profile].kip  = user.uuid;
                
                if(!profiles[profile].uuid) {
                    var id = utils.generateUUID();
                    profilesForBulk[id] = profiles[profile];
                    user.kipenzis.push(id);
                } else {
                    profilesForBulk[profiles[profile].uuid] = profiles[profile];
                    user.kipenzis.push(profiles[profile].uuid);
                    delete profiles[profile].uuid;
                }
            }
            
            profilesForBulk[user.uuid] = user;
            
            // adds all the profiles user + pets
            addProfiles(profilesForBulk, function (status, result) {
                var date2 = new Date();
                logger.debug("time for appointment processing : " + date1.getTime() + " : " + date2.getTime() + " : " +  (date2 - date1));
                addBooking(addBooking.service_provider, user.uuid, user.kipenzis, function(status, result) {
                    callback(status, result); 
                });
            });
       
        });
        
    } else {
        return callback(403, {type: 'validation', error: validation.error, message: message.appointment.registration.validation});
    }
    
};

// insert / update profile details in the db
var addProfiles = function(profiles, callback) {
    
    db.bulkUpsertTransaction(config.couchbase.buckets.profiles, profiles, function (error, result) {
        if(error) {
            //db error
            logger.error("appointment", "DB",  'bulk insert failed ');
            return callback(500, {type: 'db', message: message.support.contact_support});
        } else if (result) {
            // inserted new kipenzis
            logger.info("appointment", "DB", "inserted the profiles" + JSON.stringify(result));
            return callback(200, result);
        }
    });
};

var addBooking = function(service_provider, user_uuid, kipenzis_uuid, callback) {
    //service provider, user, pets, token
    var document = {};
    document.s_p        = service_provider;
    document.user       = user_uuid;
    document.kipenzis   = kipenzis_uuid;
    
    var token   = utils.generateToken();
    
    db.insert(config.couchbase.buckets.relational_transactions, token, document, function(error, result){
        if(error) {
            //db error
            logger.error("addBooking", "DB",  error);
            return callback(500, {status: false, type: 'db', message: message.support.contact_support});   
        }
        return callback(200, {token: token});
    });
};


Register.getUserAndPetDetails = function (mobile, callback) {
  
    db.query(config.couchbase.buckets.profiles, queries.appointment.get_user_using_mobile, [mobile])
        .then(function (result) {
            logger.debug("getUserAndPetDetails", "user", mobile + JSON.stringify(result[0][0]));
        
            // add get multi for pets here
            if(utils.isEmpty(result[0][0])) {
                return callback(result[0][0], null);
            }
        
            var user_and_pet_details = {}; 
            user_and_pet_details.user = result[0][0];
        
            if (!user_and_pet_details.user.kipenzis || !(user_and_pet_details.user.kipenzis.length > 0)) {
                return callback(user_and_pet_details, null);
            }
            
            db.getMulti(config.couchbase.buckets.profiles, user_and_pet_details.user.kipenzis, function(error, result) {
                
                user_and_pet_details.kipenzis = [];
                
                for(var uuid in result) {
                    var kipenzi = result[uuid].value;
                    if(kipenzi) {
                        kipenzi.uuid = uuid;
                        user_and_pet_details.kipenzis.push(kipenzi);
                    }
                }
                
                callback(user_and_pet_details, null);
            });
            
        }, function (error) {
            //db error
            logger.error("getUserAndPetDetails", "DB",  username + ' : ' + error);
            return callback(null, {status: false, type: 'db', message: message.support.contact_support});
        }).catch(function (error) {
            //q error
            logger.error("getUserAndPetDetails", "q",  username + ' : ' + error.stack);
            return callback(null, {status: false, type: 'q', message: message.support.contact_support});
        });
    
};