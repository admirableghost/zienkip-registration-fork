'use strict';

var console = require('console');
var config  = require('../../config');

function Logger() {};

module.exports = Logger;

var log = function (severity, module, type, message) {
    console.log('[' + severity + ']\t: [' + module + '] : [' + type + '] : '+ message)
};

Logger.debug = function (module, type, message) {
    log('DEBUG', module, type, message)
};

Logger.info = function (module, type, message) {
    log('INFO', module, type, message)
};

Logger.warn = function (module, type, message) {
    log('WARN', module, type, message)
};

Logger.error = function (module, type, message) {
    log('ERROR', module, type, message)
};