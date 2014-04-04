var productDirective, detectWindowDirective, bottomChooseDirective, hoverAuthorCircleDirective, appFrameDirective, sendDirective;
productDirective = function($timeout){
  return {
    retrict: 'A',
    link: function(scope, elem, attr){}
  };
};
detectWindowDirective = function(){
  return {
    retrict: 'A',
    link: function(scope, elem, attr){
      var container, hammertime;
      container = document.getElementById('innersub');
      hammertime = new Hammer(container, {
        drag_max_touches: 0
      });
      hammertime.on("touch drag", function(ev, _scope){
        ev.gesture.preventDefault();
      });
    }
  };
};
bottomChooseDirective = function(){
  return {
    retrict: 'A',
    link: function(scope, elem, attr){
      var container, hammertime;
      container = document.getElementById('bottomChoose__frame');
      hammertime = new Hammer(container, {
        drag_max_touches: 0
      });
      hammertime.on("swipe drag", function(ev, _scope){
        ev.gesture.preventDefault();
      });
    }
  };
};
hoverAuthorCircleDirective = function(){
  return {
    retrict: 'A',
    link: function(scope, elem, attr){
      elem.bind('mouseover', function(e){
        var li;
        li = elem.find('a');
        li.find('div').removeClass('index-right-content-post-lists-author__lists__mask__flipout').addClass('index-right-content-post-lists-author__lists__mask__flipin');
        return li.find('img').removeClass('index-right-content-post-lists__author__lists__img__flipin').addClass('index-right-content-post-lists__author__lists__img__flipout');
      });
      elem.bind('mouseleave', function(e){
        var li;
        li = elem.find('a');
        li.find('div').removeClass('index-right-content-post-lists-author__lists__mask__flipin').addClass('index-right-content-post-lists-author__lists__mask__flipout');
        return li.find('img').addClass('index-right-content-post-lists__author__lists__img__flipout').addClass('index-right-content-post-lists__author__lists__img__flipin');
      });
    }
  };
};
appFrameDirective = function(){
  return {
    retrict: 'A',
    scope: {
      post: '=postNavOpen'
    },
    link: function(scope, elem, attr){
      elem.bind('click', function(){});
    }
  };
};
sendDirective = function(){
  return {
    retrict: 'A',
    link: function(scope, element, attr){
      element.bind("keydown keypress", function(event){
        if (event.which === 13) {
          scope.$apply(function(){
            scope.mySocket.emit('broadcast', {
              content: scope.livetext,
              location: scope.location
            });
            return scope.livetext = '';
          });
          return event.preventDefault();
        }
      });
    }
  };
};
angular.module('textbroadcast').directive('send', sendDirective).directive('hoverAuthorCircle', hoverAuthorCircleDirective).directive('appFrame', appFrameDirective).directive('product', productDirective).directive('detectwindow', detectWindowDirective).directive('bottomChoose', bottomChooseDirective);