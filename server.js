// Require express
var express = require('express');
var app = express();

// Path
var path = require('path');

// Basic Settings
var config = require('./config');

/**
 * Main Catchall Route
 */

// Set Static files directory
app.use(express.static(__dirname + '/public'));

// Catch'em all
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Let the magic happen
app.listen(config.port, function() {
    console.log('Magic happens at port ' + config.port + '!');
});