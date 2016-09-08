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

// creates / updates the user details and registers an appointment
Register.createAppointment = function (appointmentReq, callback) {
    
    logger.debug("appointment", "general",  JSON.stringify(appointmentReq));
    
    var validation = validator.validateAppointmentRegistration(appointmentReq);

    if(validation.isValid) {
        
        var profiles    = appointmentReq.kipenzis;
        var user        = appointmentReq.user;
        var kipenziIds  = [];
        
        var profilesForBulk = {};
        
        user.uuid = user.uuid || user.mobile;
        user.type = user.type || "kip";
        
        // assigns a uuid to profiles without one and retains the uuid for existing
        for (var profile in profiles) {
            
            profiles[profile].type = profiles[profile].type || "kipenzi";
            profiles[profile].kip  = user.uuid;
            
            if(!profiles[profile].uuid) {
                var id = uuid.v4();
                profilesForBulk[id] = profiles[profile];
                kipenziIds.push(id);
            } else {
                profilesForBulk[profiles[profile].uuid] = profiles[profile];
                kipenziIds.push(profiles[profile].uuid);
                delete profiles[profile].uuid;
            }
        }
        
        user.kipenzis = kipenziIds;
        profilesForBulk[user.uuid] = user;
        
        this.addProfiles(profilesForBulk, function (status, result) {
            callback(status, result);
        });
       
    } else {
        return callback(403, {type: 'validation', error: validation.error, message: message.appointment.registration.validation});
    }
    
};

// insert / update profile details in the db
Register.addProfiles = function(profiles, callback) {
    
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