'use strict';
angular.module('angular-medium-editor', []).directive('mediumEditor', function () {
  return {
    require: 'ngModel',
    restrict: 'AE',
    link: function (scope, iElement, iAttrs, ctrl) {
      
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
        scope.$apply(function () {
          if (iElement.html() == '<p><br></p>') {
            opts.placeholder = placeholder;
            var editor = new MediumEditor(iElement, opts);
          }
          ctrl.$setViewValue(iElement.html());
        });
      });
      
      
      scope.check = 0
      var tmpDom ;
      
      scope.clickit = function(){
        // alert(tmpDom);
        // console.log(tmpDom)
        // angular.element(e.toElement).html('12333');
        var addpic = document.querySelector('.addpic')
        // addpic
      }
      

      // scope.$on
      iElement.on('mousedown', function (e) {
        // console.log(e.toElement)
        tmpDom = e.toElement
        // console.log(tmpDom)
        // console.log(iElement);
        console.log(e.srcElement.childNodes[0]);
        if (!e.srcElement.childNodes[0].data){
          angular.element(iElement).find('p').removeClass('addpic');
          angular.element(e.toElement).addClass('addpic')
        }
        // console.log(e.toElement.outerHTML)
        var t = e.toElement.outerHTML.replace(' ','')
        // console.log(t.match('goyoutube'))
        if (t.match('goyoutube') != null){
          scope.$emit('YTseekTo',(e.srcElement.childNodes[0].data))
        }
        var total = 0;
        var _tmp = [];
        var tmp  = [];
        for (var i = 0; i < iElement.children().length ;i++){
          tmp.push(iElement.children()[i].clientHeight);
        }
        for (var i = 0; i< tmp.length ;i++){
          total = tmp[i] + total;
          _tmp.push(total);
        }
        for (var i = 0; i< _tmp.length ;i++){
          if( _tmp[i] == e.toElement.offsetTop){
            scope.check = i
          }
        }
        
        // console.log(_tmp)
        // console.log(scope.check)
        // ctrl.$viewValue = iElement.html();
        // ctrl.$render();  
      })
      // iElement.on('keyup', function (e) {
      //   ctrl.$viewValue = iElement.html();
      //   ctrl.$render();
      // })
      iElement.on('mouseover', function (e) {
        // var total = 0;
        // console.log('f:'+e.toElement.offsetTop)
        // if(_tmp.length == 0){
        //   for (var i = 0; i< iElement.children().length ;i++){
        //     tmp.push(iElement.children()[i].clientHeight);
        //   }
        //   for (var i = 0; i< tmp.length ;i++){
             
        //     total = tmp[i] + total;
        //     _tmp.push(total);
        //   }
        // }
        // console.log(iElement)
        
        var nav = document.getElementById('postNav');
        var ckthis = 0;
        console.log(e.srcElement.childNodes[0]);

        if (!e.srcElement.childNodes[0].data){
          nav.style.top = e.clientY - 20 + 'px';
          nav.style.display = 'block'
        }else{
          nav.style.display = 'none'
        }
        // var iElemHtml = ''
        // var st = iElement.html()
        // ctrl.$setViewValue(iElemHtml);
        // ctrl.$viewValue = iElemHtml;
        // ctrl.$render();  
        
      })
  
      iElement.on('keyup',function(e){
        console.log(window.getSelection().toString().trim())
        // alert(window.getSelection())
      })

      iElement.on('keypress',function(event){
        if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
        alert("Ctrl-S pressed");
        event.preventDefault();
        return false;
      })

      // iElement.on('keyup',function(e){
        
      //   ctrl.$setViewValue(iElemHtml);
      //   ctrl.$viewValue = iElemHtml;
      //   ctrl.$render();   
           
      // })

      ctrl.$render = function () {
        if (!editor) {
          if (!ctrl.$isEmpty(ctrl.$viewValue)) {
            opts.placeholder = '';
          }
          var editor = new MediumEditor(iElement, opts);
        }
        iElement.html(ctrl.$isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
      };
    }
  };
});