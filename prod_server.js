var express = require('express');
var http = require('http');
var path = require('path');
var compression = require('compression');
//var React = require('react');
//require("node-jsx").install();
//var fs = require('fs');

var app = express();

app.use(compression());

//var template = fs.readFileSync(path.join(__dirname, '/public/index.html'), 'utf8');

//var ReactApp = React.createFactory(require('app/index').ReactApp);
//var ReactApp = React.createFactory(require('./app/index'));

app.use(express.static(__dirname + '/dist'));

app.get('*', function(req, res){
  //var ReactRouter = require('react-router');
  //var match = ReactRouter.match;
  //var routes = require('./app/routes.js')

  //match({routes: routes, location: req.url}, function(error, redirectLocation, renderProps) {
  //    /* Send response */
  //});


  //var reactHtml = React.renderToString(ReactApp({}));
  //res.render('index.ejs', {reactOutput: reactHtml});

  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

var server = http.createServer(app);
server.listen(80);
