var appointmentVO   = function (user, kipenzis, time_slot) {
    this.user       = user;
    this.kipenzis   = kipenzis;
    this.time_slot  = time_slot;
}

var userVO = function (user) {
    if(!user) {
        user = {};
    }
    
    this.fname   = user.fname;
    this.lname   = user.lname;
    this.mobile  = user.mobile;
    this.gender  = user.gender  || false;
    this.type    = user.type    || "kip";
}

var kipenziVO = function (kipenzi) {
    if(!kipenzi) {
        kipenzi = {};
    }
    
    this.uuid    = kipenzi.uuid;
    this.name    = kipenzi.name;
    this.type    = kipenzi.type;
    this.breed   = kipenzi.breed;
    this.gender  = kipenzi.gender;
    this.dob     = kipenzi.dob;
    this.type    = kipenzi.type || "kipenzi";
}