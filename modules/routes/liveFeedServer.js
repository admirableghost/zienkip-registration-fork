var utils       = require('../utils/utils');
var ioEmitterObject;

var ioEmitter= function(io){
	this.io = io;
	this.userSockets ={};
	this.sendData = function(data){
		console.log('liveFeedServer.js :	Data emitter :- OrgID - ' + data.orgId + ', Event - ' + data.event + ', Message - ' + JSON.stringify(data.msg) );
		this.io.in(data.orgId).emit(data.event,data.msg);
	}

};

module.exports = this;

this.initializeServer = function(io){
    
    io = io.listen(8701);
    ioEmitterObject = new ioEmitter(io);
    console.log('Live Feed Server started');  
    
    io.on('connection',function(socket){
        console.log('User is connected to live feed server');
        var userName	= socket.request._query['userName'];
        var orgId 		= /*socket.request._query['orgId'];*/ 'TestOrgID';    
    
		socket.join(orgId);
        
		ioEmitterObject.userSockets[userName+'-'+orgId] = socket;
    })
    
}

this.getIOEmitter = function() {
    console.log("Emiiter Object" +ioEmitterObject.io )
    return ioEmitterObject;
}
