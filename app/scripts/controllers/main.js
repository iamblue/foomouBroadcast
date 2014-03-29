console.log(MediumEditor);
angular.module('mindmineApp').run(function(){
  var tag, firstScriptTag;
  tag = document.createElement('script');
  tag.src = "//www.youtube.com/iframe_api";
  firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}).factory('ytplayerapi', ['$window', '$rootScope', '$timeout'].concat(function($window, $rootScope, $timeout){
  var ytplayer;
  ytplayer = {
    "playerId": null,
    "playerObj": null,
    "videoId": null,
    "height": 390,
    "width": 640
  };
  $window.onYouTubeIframeAPIReady = function(){
    $rootScope.$broadcast('loadedApi');
  };
  ytplayer.setPlayerId = function(elemId){
    this.playerId = elemId;
  };
  ytplayer.loadPlayer = function(){
    this.playerObj = new YT.Player(this.playerId, {
      height: this.height,
      width: this.width,
      videoId: this.videoId,
      "events": {
        "onReady": this.onPlayerReady,
        "onStateChange": this.onPlayerStateChange
      }
    });
    this.onPlayerReady = function(e){
      return this.playerObj.playVideo();
    }.bind(this);
    this.onPlayerStateChange = function(e){
      var time;
      if (e.data === YT.PlayerState.PLAYING) {
        return time = this.playerObj.getCurrentTime();
      }
    }.bind(this);
  };
  ytplayer.pauseVideo = function(){
    this.playerObj.pauseVideo();
  };
  ytplayer.playVideo = function(){
    this.playerObj.playVideo();
  };
  ytplayer.getPlaybackRate = function(rate){
    return this.playerObj.getPlaybackRate(rate);
  };
  ytplayer.seekTo = function(time){
    time = Number(time);
    if (time !== null) {
      return this.playerObj.seekTo(time);
    }
  };
  ytplayer.playVideo = function(){
    this.onPlayerReady();
  };
  ytplayer.getCurrentTime = function(){
    return this.playerObj.getCurrentTime();
  };
  return ytplayer;
})).factory('ytdataapi', ['$http'].concat(function($http){
  var _params, api, yt_resource;
  _params = {
    key: 'AIzaSyD9d0--cip6b2DG0FtumOYRMPfbXQps85Y'
  };
  api = 'https://www.googleapis.com/youtube/v3/';
  yt_resource = {
    api: api
  };
  yt_resource.search = function(query, parameters){
    var config;
    config = {
      params: angular.extend(angular.copy(_params), {
        maxResults: 10,
        part: "snippet"
      }, parameters)
    };
    return $http.get(api + "search?q=" + query, config);
  };
  return yt_resource;
})).controller('mainCtrl', ['$fileUploader', '$timeout', '$window', '$http', '$scope', '$rootScope', '$location', '$localStorage', 'ytplayerapi', 'ytdataapi'].concat(function($fileUploader, $timeout, $window, $http, $scope, $rootScope, $location, $localStorage, ytplayerapi, ytdataapi){
  var uploader;
  uploader = $fileUploader.create({
    scope: $scope,
    url: "http://127.0.0.1:3333/uploader/upload",
    formData: [{
      key: 'value'
    }],
    filters: [function(item){
      if (item.size > 10000000) {
        alert('size不得超過10mb');
        return false;
      } else {
        return true;
      }
    }]
  });
  uploader.filters.push(function(item){
    return true;
  });
  $scope.picPool = [];
  $scope.removepicPool = function($in){
    var tmpPic;
    tmpPic = [];
    angular.forEach($scope.picPool, function(v, i, o){
      if (i !== $in) {
        return tmpPic.push(v);
      }
    });
    return $scope.picPool = tmpPic;
  };
  $scope.changepic = function($index){
    return $scope.mainpic = $scope.picPool[$index].u;
  };
  uploader.bind('afteraddingfile', function(event, item, progress){
    uploader.uploadAll();
    return $scope.postLeftContent.replace('<p class="addpic"><br></p>', '<p><img src="" /></p>');
  });
  uploader.bind('progress', function(event, item, progress){
    return console.info('Progress:' + progress, item);
  });
  uploader.bind('beforeupload', function(event, item){
    return console.info('Before upload', item);
  });
  uploader.bind('complete', function(event, xhr, item){
    var _x;
    _x = angular.fromJson(xhr.response);
    console.log(_x);
    $scope.postLeftContent = $scope.postLeftContent.replace('<p class="addpic"><br></p>', '<img style="width:100%" src="https://s3-us-west-2.amazonaws.com/mindmine/' + _x.n + '" />');
    return $scope.$apply();
  });
  uploader.bind('completeall', function(event, items){
    $scope.oi = false;
  });
  $scope.uploader = uploader;
  $scope.kerker = function(){
    console.log(123334234234234);
    return console.log($scope.uploader);
  };
  $scope.closepostNav = function(){
    if ($scope.postNavOpen === true) {
      return $scope.postNavOpen = false;
    }
  };
  $scope.$watch('closeIndexBook', function(){
    if ($scope.closeIndexBook === true) {
      $timeout(function(){
        document.getElementById('index__frame').style.display = 'none';
        document.getElementById('index__frame').style['pointer-events'] = 'none';
        document.getElementById('mask-page').style.display = 'none';
        return document.getElementById('mask-page').style['pointer-events'] = 'none';
      }, 2000);
    }
  });
  $scope.showyoutube = false;
  $scope.$on('loadedApi', function(e, yurl){
    ytdataapi.search("", {
      'topicIds': yurl,
      'type': 'video',
      'maxResults': 1,
      'order': 'viewCount'
    }).success(function(apiresults){
      ytplayerapi.videoId = yurl;
      ytplayerapi.loadPlayer();
      $scope.goyoutubeinput = false;
      return $scope.showyoutube = true;
    });
  });
  $scope.$on('YTgetCurrentTime', function(){
    $scope.time = ytplayerapi.getCurrentTime();
  });
  $scope.$on('YTseekTo', function(e, time){
    return ytplayerapi.seekTo(time);
  });
  $scope.$on('YTgPlaybackRate', function(e, rate){
    ytplayerapi.getPlaybackRate(rate);
    return ytplayerapi.playVideo();
  });
  $scope.goyoutube = function(time){
    return alert('1233333');
  };
  $scope.tagyoutube = function(){
    $scope.$emit('YTgetCurrentTime');
    $scope.time.length = 4;
    $scope.postLeftContent = $scope.postLeftContent.replace('<p class="addpic"><br></p>', '<p><a goyoutube class="post__main__goyoutube">' + $scope.time + '</a></p><p><br></p>');
  };
  $scope.searchyoutubeurl = function(){
    var yurl;
    yurl = $scope.youtubeurl.replace('https://www.youtube.com/watch?v=', '');
    $scope.$emit('loadedApi', yurl);
    return ytplayerapi.setPlayerId('player');
  };
  $scope.play = function(){
    return ytplayerapi.playVideo();
  };
  $scope.time = 0;
  $scope.stop = function(){
    return $scope.$emit('YTsetPlaybackRate', 0.1);
  };
  $scope.seek = function(time){
    return $scope.$emit('YTseekTo', time);
  };
  $scope.postRightContent = '<h3>我們來自四方</h3><p><br></p><p>g0v.tw 是一個致力於打造資訊透明化的社群。g0v.tw 的參與者來自四方，有程式開發者、設計師、社會運動工作者、教育工作者、文字工作者、公民與鄉民等來自各領域的人士。這些人聚在一起，希望資訊透明化可以更進一步的改善台灣的公民環境。只要有心想用自己的專業及能力來參與，就可以加入 g0v.tw。</p><p><br></p><h3>我們支持言論自由、資訊開放</h3><p><br></p><p>g0v.tw 以開放原始碼的精神為基底，關心言論自由、資訊開放，希望可以最新的科技，提供讓公民更容易使用的資訊服務。資訊的透明化可以幫助公民更確實了解政府運作，更快速了解議題，更有效監督政府，確保政府不脫離民有、民治、民享的本質。</p><h3>我們自主參與，成果開放</h3><p><br></p><p>我們平時透過 g0v.tw 各網路平台（IRC, hackpad, github）溝通協作，或參與不定期舉辦的黑客松活動。我們的成果（包括文件、程式碼、運算資料、數據分析結果及過程執行方式）需遵循開放原始碼授權，讓更多人能使用、改善、回饋，發揮最大效用。各專案成果不屬於 g0v.tw，但也歡迎在此平台共享。</p>';
  return $scope.postLeftContent = '<h3>我們來自四方</h3><p><br></p><p>g0v.tw 是一個致力於打造資訊透明化的社群。g0v.tw 的參與者來自四方，有程式開發者、設計師、社會運動工作者、教育工作者、文字工作者、公民與鄉民等來自各領域的人士。這些人聚在一起，希望資訊透明化可以更進一步的改善台灣的公民環境。只要有心想用自己的專業及能力來參與，就可以加入 g0v.tw。</p><p><br></p><h3>我們支持言論自由、資訊開放</h3><p><br></p><p>g0v.tw 以開放原始碼的精神為基底，關心言論自由、資訊開放，希望可以最新的科技，提供讓公民更容易使用的資訊服務。資訊的透明化可以幫助公民更確實了解政府運作，更快速了解議題，更有效監督政府，確保政府不脫離民有、民治、民享的本質。</p><h3>我們自主參與，成果開放</h3><p><br></p><p>我們平時透過 g0v.tw 各網路平台（IRC, hackpad, github）溝通協作，或參與不定期舉辦的黑客松活動。我們的成果（包括文件、程式碼、運算資料、數據分析結果及過程執行方式）需遵循開放原始碼授權，讓更多人能使用、改善、回饋，發揮最大效用。各專案成果不屬於 g0v.tw，但也歡迎在此平台共享。</p>';
}));