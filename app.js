/*
 * Module dependencies.
 */
var express = require('express')
  , path = require('path')
  , routes = require('./routes');

var bodyParser = require('body-parser')
  , errorhandler = require('errorhandler')
  , favicon = require('serve-favicon')
  , fs = require('fs')
  , http = require('http')
  , methodOverride = require('method-override')
  , logger = require('morgan');

/* 
 * Error handling
 */  
//   , multer = require('multer');

var app = express();

/* 
 * App dependencies
 */
app.set('port', process.env.PORT || 5000);
app.set('title', 'CalDiagram');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
  app.use(logger('dev'));
}

// production only
if ('production' == app.get('env')) {
  var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
  app.use(logger('combined', {stream: accessLogStream}));
}

/*
 * Routes
 */
app.get('/', routes.index);

/*
 * Init server
 */
var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Express server listening on http://%s:%s', host, port);
});
