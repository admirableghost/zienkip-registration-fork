var crypto      = require('crypto')
var nJwt        = require('njwt');
var secureRandom    = require('secure-random');
var expressjwt  = require('express-jwt');



var signingKey = secureRandom(256, {
    type: 'Buffer'
}); // Create a highly random byte array of 256 bytes
var auth = expressjwt({
  secret: signingKey
  

});


var userSchema = function () {

    this.email = ""; 
    this.salt = "";
    this.hash = "";
    this.password = "";
    this.auth =auth;
}



userSchema.prototype.setPassword = function  (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.prototype.validPassword = function  (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

userSchema.prototype.generateJwt = function  () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    var claims = {
        iss: "http://myapp.com/", // The URL of your service
        sub: "users/user1234", // The UID of the user in your system
        scope: "self, admins",
        exp: parseInt(expiry.getTime() / 1000)
    }

    var jwt = nJwt.create(claims, signingKey);
    return jwt.compact();


};



module.exports =  userSchema;