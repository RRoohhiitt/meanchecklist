//var callbackWrapper = function (){
//  return function(callback) {
//    callback(null, 5);
//  };
//};
//
//var result = null;
//var generator = (function *(){
//  result = yield callbackWrapper();
//})();
//
//var nextIteration = generator.next().value(function(value,value41){
//	console.log(value,value41);
//});
var express = require("express");
var bodyParser = require("body-parser");
var compression = require('compression');
var db = require('mongoose');
var reload = require('reload')
var config = require('./config');
var app = express();
var logger = require('morgan');
db.Promise = global.Promise;
db.connect(config.mongo.db, function (err) {
  if (!err) {
    console.log("Connected to database");
  }
});
app.use(compression());
app.use(logger('dev'));
app.use(function (req, res, next) {
  res.setHeader('X-Powered-By', 'Apache/2.4.16');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  //     res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
  next();
});
app.use(express.static(__dirname + "/public_html"));
app.use(bodyParser.urlencoded({
  extended: true
}));

/* Live Reload Setup  */
server = require('http').createServer(app);
reload(server, app);
/* End Live Reload Setup */

app.use(bodyParser.json());
require('./routes/route')(app);

server.listen(8080, function () {
  console.log("listening on 8080");
});