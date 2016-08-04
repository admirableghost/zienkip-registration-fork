var passport            = require('passport');
var LocalStrategy       = require('passport-local').Strategy;
var FacebookStrategy    = require('passport-facebook').Strategy;

var loginUtil           = require('./login');
var config              = require('../../config');

passport.use(new LocalStrategy(loginUtil.login));



passport.use(new FacebookStrategy({
        // pull in our app id and secret from our auth.js file
        clientID: config.facebook.app_id,
        clientSecret: config.facebook.app_secret,
        callbackURL: "http://localhost:8765/auth/facebook/callback"
    },


    function (token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function () {
            var user = function () {
                this.name = 'ashwin';
                this.scope = 'mainpage';
                this.id = profile.id;
                this.email = profile.email;
                
            }
            var userObj = new user();
            return done(null, userObj);

        })
    }


));