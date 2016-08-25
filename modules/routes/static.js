var express     = require('express');
var app         = express.Router();
var path        = require('path');

var config      = require('../../config');
var auth        = require('../auth/authentication');

module.exports = app;

app.post('/menus', /*auth.routingAuth,*/ function (req, res) {
    
//    db.query(config.couchbase.buckets.profiles, query, [username, pwd])
//        .then(function (result) {
//            if (!utils.isEmpty(result[0])) {
//                //valid user
//                return done(null, result[0][0]);
//            } else {
//                console.log(username + ' invalid username / pwd')
//                return done(null, false, {message: 'User name or password is wrong'});
//            }
//        }, function (error) {
//            //db error
//            console.log(username + ' : ' + error);
//            return done(null, false, {status: false, type: 'db', message: 'please contact support'});
//        }).catch(function (error) {
//            //q error
//            console.log(username + ' : ' + error.stack);
//            return done(null, false, {status: false, type: 'q', message: 'please contact support'});
//        });
    
    res.json({
        menus: [{name: "Home", state: "menu.home", class: "fa fa-home", submenu:[]}, 
                {name: "Appointment", state: "menu.appointment", class: "fa fa-desktop", submenu:[]}, 
                {name: "Calendar", state: "menu.calendar", class: "fa fa-calendar", label: "Coming soon", submenu:[]}
               ]
    });
});