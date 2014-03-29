'use strict';

module.exports = function ($youmeb) {


  var request = require('request');
  var redis = require("redis"),
      client = redis.createClient(null,null,{detect_buffers:true});
  // var oldmem ;
  // setTimeout (function() { 
  //   request.get({url:'http://congress-text-live.herokuapp.com/json/', json:true}, function (e, r, user) {  
  //     oldmem = r.body
  //     for (var i = Things.length - 1; i >= 0; i--) {
  //       Things[i]
  //     };
  //     // console.log(oldmem)
  //     client.get(new Buffer("oldmsg"), function(err, reply) {
  //       console.log(reply)
  //       res.send({data:r});   
  //     });
  //   })
  //  }, 2000);
  

  this.$({
    name: 'irc',
    path: '/irc'
  });
  
  // this.news = {
  //   path: '/news',
  //   methods: ['all'],
  //   handler: function (req, res, next) {
  //     res.send({data:oldmem})
  //     // client.get(new Buffer("oldmsg"), function(err, reply) {
  //     //   console.log(reply)
  //     //   res.send({data:r});   
  //     // });
  //     // request.get({url:'http://congress-text-live.herokuapp.com/json/', json:true}, function (e, r, user) {
  //     //   res.send({data:r});        
  //     // })
  //   }
  // };







};
