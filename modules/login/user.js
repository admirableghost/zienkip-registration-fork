var crypto      = require('crypto')
var nJwt        = require('njwt');
var secureRandom    = require('secure-random');
var expressjwt  = require('express-jwt');
var fs          = require('fs');

var config      = require('../../config');

//var signingKey = fs.readFileSync(__dirname + '/../../bin/new/cert.pem', 'utf8');

var signingKey = secureRandom(256, {
    type: 'Buffer'
}); // Create a highly random byte array of 256 bytes


var auth = expressjwt({
//    algorithm: config.security.jwt_algo,
    secret: signingKey
});


var userSchema = function (user) {
    this.user = user;
    this.auth = auth;
}



userSchema.prototype.setPassword = function  (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.prototype.validPassword = function  (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

userSchema.prototype.generateJwt = function  (user) {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    var claims = {
        iss: config.url, // The URL of your service
        sub: user.uuid, // The UID of the user in your system
        scope: user.role,
        exp: parseInt(expiry.getTime() / 1000)
    }

    var jwt = nJwt.create(claims, signingKey); //, config.security.jwt_algo);
    return jwt.compact();

};

module.exports =  userSchema;