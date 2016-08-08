var express     = require('express');
var app         = express.Router();
var path        = require('path');
var passport    = require('passport');

var utils       = require('../utils/utils');
var loginUtil   = require('../login/login');
var userSchema  = require('../login/user');

var userSchemaObj   = new userSchema();
var routingAuth     = userSchemaObj.auth;

module.exports = app;

app.get('/', /*routingAuth,*/ function (req, res) {
    res.sendFile('index.html', {
        root: path.join(__dirname, '../../public/views')
    });
});

app.post('/login', loginUtil.authenticateLogin);


//app.get('/', function (req, res, next) {
//    passport.authenticate('local', function(err, user, info) {
//        if (err) {
//            console.log(err);
//            return res.redirect('/login'); 
//        }
//        if (!user) {
//            return res.redirect('/login'); 
//        }
//        res.sendFile('index.html', {
//            root: path.join(__dirname, '../../template/production')
//        });
//        res.json({
//            "token": obj.generateJwt()
//        });
//    })(req, res, next);
//});
//
//app.post('/api/getUserName', routingAuth, function (req, res) {
//    console.log('Logged in success and access granted to resource')
//    res.send('sucess Authed flow -- Ashwin');
//
//});
//
//app.post('/authenticate', function (req, res) {
//
//    passport.authenticate('local', function (err, user, info) {
//        var token;
//
//        console.log("Facebook Auth " + req.body.facebooktoken);
//        console.log('main.js' + err + user);
//        // If Passport throws/catches an error
//        if (err) {
//            res.status(404).json("eror passport");
//            return;
//        }
//
//        // If a user is found
//        if (user) {
//            var obj = new userSchema();
//
//            res.status(200);
//            res.json({
//                "token": obj.generateJwt()
//            });
//        } else {
//            // If user is not found
//            res.status(401).json(info);
//        }
//    })(req, res);
//
//});
