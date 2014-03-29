'use strict';

module.exports = function ($youmeb) {

  this.$({
    name: 'msg',
    path: '/msg'
  });

  this.save = {
    path: '/post/save',
    methods: ['all'],
    handler: function (req, res, next) {
      res.send('msg');
    }
  };

  this.police = {
    path: '/post/police',
    methods: ['all'],
    handler: function (req, res, next) {
      res.send('msg');
    }
  };

  this.msg = {
    path: '/post/police',
    methods: ['all'],
    handler: function (req, res, next) {
      res.send('msg');
    }
  };

  

};
