'use strict';

var path = require('path');

module.exports = function (done) {

  this.express(function (app, express) {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
     app.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
      return next();
    });
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
  });

  this.routes();

  done();
};


var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8880);

// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });
// var Padnews = require('padnews');
var irc = require("irc");
var request = require('request');
  
// var pad = new Padnews('sgyfCRGiBZC', 'g0v');

var config = {
  channels: ["#g0v.tw"],
  server: "irc.freenode.net",
  botName: "ircirc"
};

var bot = new irc.Client(config.server, config.botName, {
  channels: config.channels
});

var oldmem ;
var tmp ;


io.sockets.on('connection', function (socket) {
  setTimeout (function() { 
    socket.emit('news', { g0v: '1231231'});
  },1000)
  bot.addListener("message", function(from, to, text, msg) {
    setTimeout (function() { 
      request.get({url:'http://congress-text-live.herokuapp.com/json/', json:true}, function (e, r, user) {  
        // console.log(r)
        oldmem = r.body
        // console.log(oldmem)
        if (r.body[0] && r.body[0].content && tmp != r.body[r.body.length-1].content[0]){
          socket.emit('news', { main: r.body[r.body.length-1].content[0] });          
          tmp = r.body[r.body.length-1].content[0];
        }else{
          if (tmp){
            console.log(tmp)
            socket.emit('news', { main: tmp});
          }else{
            socket.emit('news', { main: ''});
          }
        }
      })
   }, 1000);
    socket.emit('news', { g0v: from+' : '+text });
    socket.on('sos', function (data) {
      socket.broadcast.emit('sos',{p:data.p, msg:data.msg, icon:data.icon});
    });
  });
  // bot.say(channel, who + "...dude...welcome back!");
});


 
