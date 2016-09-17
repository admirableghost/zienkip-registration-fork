var express     = require('express');
var app         = express.Router();
var path        = require('path');
var passport    = require('passport');

var appReg      = require('../appointment/appointment-registration');
var authUtil    = require('../auth/authentication');
var userSchema  = require('../auth/user');
var utils       = require('../utils/utils');

module.exports = app;

app.get('/', function (req, res) {
    res.sendFile('index.html', {
        root: path.join(__dirname, '../../public/views')
    });
});

app.post('/login', authUtil.authenticateLogin);

//app.all('/*', authUtil.routingAuth, function(req, res, next){
//    console.log('General Validations');
//    next();
//});


app.post('/api/getUserAndPetDetails', /*authUtil.routingAuth,*/ function(req, res, next){
    
    console.log(JSON.stringify(req.body));
    
    appReg.getUserAndPetDetails(req.body.appointment.user.mobile, function(user, error){
        if(error) {
            res.json(error);
        }
        res.json(user);
    });
    
});

app.post('/api/appointment', /*authUtil.routingAuth(),*/ function(req, res){
//	res.send("Sucess");
    appReg.createAppointment(req.body.appointment, function(status, appointment) {
        var pingObject = {};
        
        pingObject.orgId = 'TestOrgID';
        pingObject.event = 'AppointmentEvent';
	    pingObject.msg = req.body.appointment;
	    console.log('index.js	:	/api/appointment - Sending Appointment Live Feed');
	    utils.sendLiveFeed(pingObject);
        
        res.status(status);
        res.json(appointment);
    });
    
});

app.post('/api/inventory', /*authUtil.routingAuth(),*/ function(req, res){
    	
	var pingObject = {};
	pingObject.orgId = 'TestOrgID';
	pingObject.event = 'InventoryEvent';
	pingObject.msg = req.body.inventory;
	console.log('index.js	:	/api/inventory - Sending Inventory Live Feed');
	utils.sendLiveFeed(pingObject);
	res.send("Sucess");
	
});