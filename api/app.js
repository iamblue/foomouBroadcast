var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  var sio = require('socket.io')
  , RedisStore = sio.RedisStore
  , io = sio.listen(8880);

  // Somehow pass this information to the workers
  io.set('store', new RedisStore);

  // Do the work here
  // io.sockets.on('connection', function (socket) {
  //   socket.on('chat', function (data) {
  //     socket.broadcast.emit('chat', data);
  //   })
  // });
  // server.listen(8880);
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
    request.get({url:'https://ethercalc.org/static/proxy/2014-04-01.txt'}, function(e,r,user){
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
  
  var sendInMsg = function (){
    var ii = 0;
    var broadcastIn = function(){
      if (lastInQueue.length <= 10){
        setTimeout(function(){
          if (lastInQueue.length != ii){
            if(ii<lastInQueue.length){
              socket.emit('news', { main: lastInQueue[ii].lastInContent , location:lastInQueue[ii].lastInLocation , time:lastInQueue[ii].lastInTime});
            }
          }else{
            // lastInQueue.length
          };
          ii++;
          broadcastIn()
        },000)
      }else{
        var main = setTimeout(function(){
          if (lastInQueue.length != ii){
            if(ii<lastInQueue.length){
              socket.emit('news', { main: lastInQueue[ii].lastInContent , location:lastInQueue[ii].lastInLocation , time:lastInQueue[ii].lastInTime});
            }
          }else{
            lastInQueue.length = 0
            clearTimeout(main);
          };
          ii++;
          broadcastIn()
        },10)
      }
    }
    broadcastIn()
  }

  var sendOutMsg = function sendOutMsg(){
    var i = 0;
    var broadcastOut = function(){
      if (lastOutQueue.length <= 10){
        setTimeout(function(){
          if (lastOutQueue.length != i){
            // console.log(lastOutQueue[i].lastOutContent);
            if (i < lastOutQueue.length){
              socket.emit('news', { main: lastOutQueue[i].lastOutContent , location:lastOutQueue[i].lastOutLocation , time:lastOutQueue[i].lastOutTime});
            }
          }else{
            // lastOutQueue.length = 0;
          };
          i++;
          broadcastOut()
        },1000)  
      }else{
        var main = setTimeout(function(){
          if (lastOutQueue.length != i){
            // console.log(lastOutQueue[i].lastOutContent);
            if (i < lastOutQueue.length){
              socket.emit('news', { main: lastOutQueue[i].lastOutContent , location:lastOutQueue[i].lastOutLocation , time:lastOutQueue[i].lastOutTime});
            }
          }else{
            lastOutQueue.length = 0;
            clearTimeout(main)
          };
          i++;
          broadcastOut()
        },10)  
      }
      
    }
    broadcastOut()
  }
  eventEmitter.on('sendInMsg', sendInMsg);
  eventEmitter.on('sendOutMsg', sendOutMsg);

  eventEmitter.emit('sendInMsg');
  socket.emit('news', { main: lastInContent , location:lastInLocation , time:lastInTime});
  // repeat()
})




}


 
