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

// var oldmem ;
var tmp = '';
var tmpdata = [];
var l = 0;
var lastContent = '';
var lastLocation = '';
var lastTime = '';
var repeatDir = function (){
  setTimeout(function(){
    // request.get({url:'http://congress-text-live.herokuapp.com/json/', json:true}, function (e, r, user) {
    //   l = r.body.total
    //   tmpdata = r.body.latest
    //   lastContent = tmpdata[r.body.latest.length-1].content[0]
    //   lastLocation = tmpdata[r.body.latest.length-1].location
    //   lastTime = tmpdata[r.body.latest.length-1].time
    // }) 
    request.get({url:'https://ethercalc.org/static/proxy/2014-03-30.txt'}, function(e,r,user){
      var _tmp = r.body.split("\n  • ")
      var contentreg = /\]/g
      lastContent = _tmp[_tmp.length-1].split('] ')[1];
      // console.log(_tmp[_tmp.length-1].split('] ')[1]);
      lastTime = _tmp[_tmp.length-1].split("• ")[0].replace(/\s/)[0]
      // console.log(lastTime)
      lastLocation = _tmp[_tmp.length-1].split("[")[1].split("]")[0]
    })
  },30000)  
}

repeatDir();
io.sockets.on('connection', function (socket) {
  // setTimeout (function() { 
  //   socket.emit('news', { g0v: '1231231'});
  // },1000)
  // var repeat = function (){
  //   setTimeout (function() { 
  //     request.get({url:'http://congress-text-live.herokuapp.com/json/', json:true}, function (e, r, user) {  
  //       // console.log(r)
  //       var oldmem = r.body.latest
  //       // console.log(oldmem[0])
  //       if (oldmem[0] && oldmem[0].content && tmp != oldmem[oldmem.length-1].content[0]){
  //         tmp = oldmem[oldmem.length-1].content;
  //         socket.emit('news', { main: tmp , location:oldmem[oldmem.length-1].location, time:oldmem[oldmem.length-1].time});
  //         // console.log(tmp)
  //       }else{
  //         if (tmp != ''){
  //           // console.log(tmp)
  //           // socket.emit('news', { main: tmp , location:oldmem[oldmem.length-1].location});
  //         }else{
  //           socket.emit('news', { main: ''});
  //         }
  //       }
  //     })
  //     repeat()
  //   }, 1000);
  // }
  // repeat()
  var repeat = function(){
    setTimeout(function(){
      socket.emit('news', { main: lastContent , location:lastLocation , time:lastTime});
      repeat()
    },30000)
  }
  repeat()
 
  // bot.addListener("message", function(from, to, text, msg) {
    
  //   socket.emit('news', { g0v: from+' : '+text });
  //   socket.on('sos', function (data) {
  //     socket.broadcast.emit('sos',{p:data.p, msg:data.msg, icon:data.icon});
  //   });
  // });
  // bot.say(channel, who + "...dude...welcome back!");
});


 
