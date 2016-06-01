'use strict';

/*
var cl = console.log;
console.log = function(){
  console.trace();
  cl.apply(console,arguments);
};
*/

process.env.NODE_CONFIG_DIR = './config/env';

// Requires meanio .
var mean = require('meanio');
var cluster = require('cluster');
var deferred = require('q').defer();
var compression = require('compression');

var express = require('express');

var app = express();

app.use(compression());

var port = process.env.PORT || 5000;

app.use('/', express.static(__dirname + '/'));

app.use(express.static('public'));

app.use(express.static('bower_components'));

app.get('/', function (req, res) {

  res.sendFile(path.join(__dirname + "/index.html"));

});

app.listen(port, function () {

  console.log('Example app listening on port 5000!');

});
