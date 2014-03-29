'use strict';
angular.module('angular-medium-editor', []).directive('mediumEditor', function () {
  return {
    require: 'ngModel',
    restrict: 'AE',
    link: function (scope, iElement, iAttrs, ctrl) {
      console.log(1231123)
      angular.element(iElement).addClass('angular-medium-editor');
      var opts = {
        // anchorInputPlaceholder: 'Type a link',
        // buttons:['superscript','subscript','strikethrough','unorderedlist','orderedlist','pre','image','indent','outdent','bold', 'italic', 'quote']
      };
      if (iAttrs.options) {
        opts = angular.fromJson(iAttrs.options);
      }
      var placeholder = opts.placeholder || 'Type your text';
      iElement.on('blur', function () {
        console.log(123)
        scope.$apply(function () {
          if (iElement.html() == '<p><br></p>') {
            opts.placeholder = placeholder;
            var editor = new MediumEditor(iElement, opts);
          }
          ctrl.$setViewValue(iElement.html());
        });
      });
      iElement.on('input', function (e) {
        // console.log(e)
        // console.log(122222223)
        console.log(iElement.html())
        var aaa =iElement.html().split(/<p><br><\/p>/g)
        console.log(aaa)
        ctrl.$setViewValue(iElement.html());
      });
      


      ctrl.$render = function () {
        if (!editor) {
          if (!ctrl.$isEmpty(ctrl.$viewValue)) {
            opts.placeholder = '';
          }
          console.log(ctrl.$viewValue);
          var editor = new MediumEditor(iElement, opts);
        }
        iElement.html(ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
      };
    }
  };
});