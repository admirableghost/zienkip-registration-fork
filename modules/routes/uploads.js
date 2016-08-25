var express     = require('express');
var app         = express.Router();
var path        = require('path');

var config      = require('../../config');
var auth        = require('../auth/authentication');

module.exports = app;

app.post('/images/profile', /*auth.routingAuth,*/ function (req, res) {
    res.sendFile(req.body.uuid+'.jpg', {
        root: path.join(config.export_path, 'uploads/images/profile')
    });
});