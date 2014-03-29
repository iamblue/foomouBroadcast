'use strict';

module.exports = function ($youmeb) {

  this.$({
    name: 'ls',
    path: ''
  });

  this.index = {
    path: '/',
    methods: ['all'],
    handler: function (req, res, next) {
      res.send('ls');
    }
  };

};
