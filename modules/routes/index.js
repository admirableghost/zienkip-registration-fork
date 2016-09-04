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


app.post('/api/appointment', /*authUtil.routingAuth,*/ function(req, res, next){
    appReg.createAppointment(req.body.appointment, function(status, appointment) {
        res.status(status);
        res.json(appointment);
    });
    
});