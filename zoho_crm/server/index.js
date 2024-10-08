// /*
// Copyright (c) 2017, ZOHO CORPORATION
// License: MIT
// */
// var fs = require('fs');
// var path = require('path');
// var express = require('express');
// var bodyParser = require('body-parser');
// var errorHandler = require('errorhandler');
// var morgan = require('morgan');
// var serveIndex = require('serve-index');
// var https = require('https');
// var chalk = require('chalk');

// process.env.PWD = process.env.PWD || process.cwd();


// var expressApp = express();
// var port = 10000;

// expressApp.set('port', port);
// expressApp.use(morgan('dev'));
// expressApp.use(bodyParser.json());
// expressApp.use(bodyParser.urlencoded({ extended: false }));
// expressApp.use(errorHandler());


// expressApp.use('/', function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next();
// });

// expressApp.get('/plugin-manifest.json', function (req, res) {
//   res.sendfile('plugin-manifest.json');
// });

// expressApp.use('/app', express.static('app'));
// expressApp.use('/app', serveIndex('app'));


// expressApp.get('/', function (req, res) {
//   res.redirect('/app');
// });

// expressApp.get('/check', (req, res) => {
//   res.send('Hello World!')
// })

// var options = {
//   key: fs.readFileSync('./key.pem'),
//   cert: fs.readFileSync('./cert.pem')
// };

// https.createServer(options, expressApp).listen(port, '0.0.0.0', function () {
//   console.log(chalk.green('Zet running at https://0.0.0.0:' + port));
//   console.log(chalk.bold.cyan("Note: If required, please open the host (https://0.0.0.0:" + port + ") in a new tab and authorize the connection."));
// }).on('error', function (err) {
//   if (err.code === 'EADDRINUSE') {
//     console.log(chalk.bold.red(port + " port is already in use"));
//   }
// });

/*
Copyright (c) 2017, ZOHO CORPORATION
License: MIT
*/
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
var serveIndex = require('serve-index');
var chalk = require('chalk');
var http = require('http'); // Use HTTP instead of HTTPS

// process.env.PWD = process.env.PWD || process.cwd();

var expressApp = express();
var port = process.env.PORT || 10000; // Use Render's dynamic port

expressApp.set('port', port);
expressApp.use(morgan('dev'));
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(errorHandler());

expressApp.use('/', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

expressApp.get('/plugin-manifest.json', function (req, res) {
  res.sendFile(path.join(__dirname, 'plugin-manifest.json'));
});

expressApp.use('/app', express.static('app'));
expressApp.use('/app', serveIndex('app'));

expressApp.get('/', function (req, res) {
  res.redirect('/app');
});

expressApp.get('/check', (req, res) => {
  res.send('Hello World!');
});

// Switch to HTTP server
http.createServer(expressApp).listen(port, '0.0.0.0', function () {
  console.log(chalk.green('Zet running at http://0.0.0.0:' + port));
}).on('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    console.log(chalk.bold.red(port + " port is already in use"));
  }
});

