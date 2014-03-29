var productDirective;
productDirective = function($timeout){
  return {
    retrict: 'A',
    link: function(scope, elem, attr){}
  };
};
angular.module('law580App').directive('product', productDirective);