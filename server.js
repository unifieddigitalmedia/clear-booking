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

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


app.get('/api/sendemail/', function (req, res) {


var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);


sendgrid.send({
  to:       'machel_slack@yahoo.co.uk',
  from:     req.query.email,
  subject:  req.query.subject,
  text:     req.query.message

}, function(err, json) {

  if (err) { return console.error(err); }
  

  console.log(json);
   res.json(json);

});


});

