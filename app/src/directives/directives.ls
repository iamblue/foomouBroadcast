
const productDirective = ($timeout)->
  {
  retrict: \A
  # templateUrl: "/views/layout/project/item/comment.html"
  link: (scope, elem, attr) !->  
    # container = document.getElementById \product
    # tmpHeight = scope.tmpHeight
    # hammertime = new Hammer(container, {drag_max_touches: 0});
    # hammertime.on "touch drag", (ev,scope) !->
    #   # console.log(ev)
    #   ev.gesture.preventDefault!
    #   touches = ev.gesture.touches
    #   console.log ev.gesture
    #   if ev.gesture.direction == \down
    #     ev.gesture.distance = - ev.gesture.distance
    #   tmpHeight := tmpHeight - ev.gesture.distance
    #   container.style['-webkit-transform'] = "translate3d(0px,#{tmpHeight}px,0px)"
    #   callback(tmpHeight)
    #   # for t from 0 to touches.length by 1 
    #   #   target = touches[t].target
    #   #   if target.className.indexOf("drag") < 0 
    #   #     return
    #   #   target.style.left = "#{(touches[t].pageX - 50)}+#{px}"
    #   #   target.style.top = "#{(touches[t].pageY - 50)}+#{px}"
    #   #   console.log target
    # callback = (tmpHeight)->
    #   scope.tmpHeight = tmpHeight
  }

const detectWindowDirective = ->
  {
    retrict : \A
    link: (scope, elem, attr) !->
      container = document.getElementById \innersub
      hammertime = new Hammer(container, {drag_max_touches: 0});
      hammertime.on "touch drag", (ev,_scope) !->
        ev.gesture.preventDefault!
      
  }
const bottom-chooseDirective = ->
  {
    retrict : \A
    link: (scope, elem, attr) !->
      container = document.getElementById \bottomChoose__frame
      hammertime = new Hammer(container, {drag_max_touches: 0});
      hammertime.on "swipe drag", (ev,_scope) !->
        ev.gesture.preventDefault!
      
  }

const hoverAuthorCircleDirective = -> 
  {
    retrict : \A
    link: (scope, elem, attr) !->
      elem.bind \mouseover, (e) ->
        li = elem.find('a')
        li.find('div').removeClass('index-right-content-post-lists-author__lists__mask__flipout').addClass('index-right-content-post-lists-author__lists__mask__flipin')
        li.find('img').removeClass('index-right-content-post-lists__author__lists__img__flipin').addClass('index-right-content-post-lists__author__lists__img__flipout')
      elem.bind \mouseleave, (e) ->
        li = elem.find('a')
        li.find('div').removeClass('index-right-content-post-lists-author__lists__mask__flipin').addClass('index-right-content-post-lists-author__lists__mask__flipout')
        li.find('img').addClass('index-right-content-post-lists__author__lists__img__flipout').addClass('index-right-content-post-lists__author__lists__img__flipin')
  }

const appFrameDirective = ->
  {
    retrict : \A
    scope: {post:'=postNavOpen'}
    link: (scope, elem, attr) !->
      elem.bind 'click' !->
        
  }
const sendDirective = ->
  {
    retrict : \A
    link: (scope, element, attr) !->
      element.bind "keydown keypress", (event)->
        if event.which == 13 
          scope.$apply ->
            scope.mySocket.emit 'broadcast', {content:scope.livetext,location:scope.location}
            scope.livetext = ''
          event.preventDefault!    
  }

angular.module \textbroadcast
  .directive \send sendDirective
  .directive \hoverAuthorCircle hoverAuthorCircleDirective
  .directive \appFrame appFrameDirective
  .directive \product productDirective
  .directive \detectwindow  detectWindowDirective
  .directive \bottomChoose bottomChooseDirective 
