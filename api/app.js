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
  , server = require('http').createServer(app),
  redis = require("socket.io/node_modules/redis")
  , io = require('socket.io').listen(server);

var RedisStore = require('socket.io/lib/stores/redis'),
    pub = redis.createClient(),
    sub = redis.createClient(),
    cmd = redis.createClient();
 
io.set('store', new RedisStore({
    redisPub: pub,
    redisSub: sub,
    redisClient: cmd
}));

server.listen(8880);
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

var tmp = '';
var tmpdata = [];
var l = 0;
var o = 0;
var lastInContent = '';
var lastInLocation = '';
var lastInTime = '';
var lastOutContent = '';
var lastOutLocation = '';
var lastOutTime = '';

var lastOutQueue = []
var lastInQueue = []

var repeatDir = function (){
  setTimeout(function(){
    request.get({url:'http://congress-text-live.herokuapp.com/json/', json:true}, function (e, r, user) {
      if (r){
        var _l = r.body.latest.length
        tmpdata = r.body.latest

        if(lastOutContent != tmpdata[r.body.latest.length-1].content[0] || lastOutContent == ''){
          for (var i = l; i < _l; i++) {
            var _tmpmsg = {}

            _tmpmsg.lastOutLocation = tmpdata[i].location
            _tmpmsg.lastOutTime = tmpdata[i].time      
            if (tmpdata[i].content.length != 1){
              for (var _i = 0; _i < tmpdata[i].content.length; _i++) {
                _tmpmsg.lastOutContent = tmpdata[i].content[_i]        
                // console.log(_tmpmsg);
                lastOutQueue.push(_tmpmsg);
              };
            }else{
              _tmpmsg.lastOutContent = tmpdata[i].content[0]        
              lastOutQueue.push(_tmpmsg);
            }
          };
          l = r.body.latest.length;
          eventEmitter.emit('sendOutMsg');
        }
      }
    }) 
    request.get({url:'https://ethercalc.org/static/proxy/2014-03-31.txt'}, function(e,r,user){
      if (r){


        var _tmp = r.body.split("\n  • ");
        var _o = _tmp.length;
        var contentreg = /\]/g
        if (lastInContent != _tmp[_tmp.length-1].split(']')[1] || lastInContent == ''){
          for (var i = o; i < _o; i++) {
            var _tmpmsg = {}
            _tmpmsg.lastInContent = _tmp[i].split(']')[1];
            _tmpmsg.lastInTime = _tmp[i].split("• ")[0].replace(/\s/)[0];
            _tmpmsg.lastInLocation = _tmp[i].split("[")[1].split("]")[0];      
            if (i == (_o -1)){
              lastInContent = _tmp[i].split(']')[1];
              lastInTime = _tmp[i].split("• ")[0].replace(/\s/)[0];
              lastInLocation = _tmp[i].split("[")[1].split("]")[0];      
            }
            lastInQueue.push(_tmpmsg);
          };
          o = _tmp.length;
          eventEmitter.emit('sendInMsg');
        }
      }
    })
    repeatDir()
  },20000)  
}
repeatDir();

var events = require('events');
var eventEmitter = new events.EventEmitter();
  


 
io.sockets.on('connection', function (socket) {
  
  var sendInMsg = function sendInMsg(){
    var ii = 0;
    var broadcastIn = function(){
      setTimeout(function(){
        if (lastInQueue.length != ii){
          if(ii<lastInQueue.length){
            socket.emit('news', { main: lastInQueue[ii].lastInContent , location:lastInQueue[ii].lastInLocation , time:lastInQueue[ii].lastInTime});
          }
        }else{
          lastInQueue.length = 0
        };
        ii++;
        broadcastIn()
      },10)
    }
    broadcastIn()
  }

  var sendOutMsg = function sendOutMsg(){
    var i = 0;
    var broadcastOut = function(){
      setTimeout(function(){
        if (lastOutQueue.length != i){
          // console.log(lastOutQueue[i].lastOutContent);
          if (i < lastOutQueue.length){
            socket.emit('news', { main: lastOutQueue[i].lastOutContent , location:lastOutQueue[i].lastOutLocation , time:lastOutQueue[i].lastOutTime});
          }
        }else{
          lastOutQueue.length = 0;
        };
        i++;
        broadcastOut()
      },10)
    }
    broadcastOut()
  }
  eventEmitter.on('sendInMsg', sendInMsg);
  eventEmitter.on('sendOutMsg', sendOutMsg);

  eventEmitter.emit('sendInMsg');
  var repeat = function(){
    setTimeout(function(){
      socket.emit('news', { main: lastInContent , location:lastInLocation , time:lastInTime});
    },10)
  }
  repeat()
});


 
