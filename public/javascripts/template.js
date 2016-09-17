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
    
    this.uuid           = kipenzi.uuid;
    this.name           = kipenzi.name;
    this.kipenzi_type   = kipenzi.kipenzi_type;
    this.breed          = kipenzi.breed;
    this.gender         = kipenzi.gender;
    this.type           = kipenzi.type || "kipenzi";
    
    if(kipenzi.dob) {
        this.dob    = new Date(kipenzi.dob);   
    } else {
        this.dob    = new Date(); 
    }
}

var validationResponseVO = function () {
    this.status = true;
    this.errors = [];
    
    var addValidationResponse = function (valStatus, valErrors) {
        status = status & valStatus;
        
        for(var error in valErrors) {
            errors.push(errors[error]);
        }
    }
}