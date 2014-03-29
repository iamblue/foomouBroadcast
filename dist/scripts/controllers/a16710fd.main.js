angular.module('law580App').controller('mainCtrl', ['$window', '$http', '$scope', '$rootScope', '$location', '$localStorage'].concat(function($window, $http, $scope, $rootScope, $location, $localStorage){
  $scope.closeit = function(){
    $rootScope.close = true;
    return $scope.chooseLawerCategory = true;
  };
  $scope.movetopit = function(){
    return $rootScope.movetop = true;
  };
  $scope.removecloseit = function(){
    $rootScope.movetop = false;
    $rootScope.close = true;
    return $location.path('/');
  };
  $scope.gomainMap = function(){
    return $location.path('/mainMap');
  };
  $scope.chooseLawerCategory = false;
  return $window.scrollTo(0, 1);
})).controller('indexCtrl', ['$http'].concat(function($http){})).controller('mainMapCtrl', ['$rootScope', '$http', '$scope'].concat(function($rootScope, $http, $scope){
  var styles, styledMap, cities, mapOptions, infoWindow, createMarker, i$, to$, i;
  $rootScope.close = true;
  $rootScope.movetop = true;
  styles = [
    {
      featureType: "water",
      stylers: [{
        color: '#021019'
      }]
    }, {
      featureType: 'landscape',
      stylers: [{
        color: '#08304b'
      }]
    }, {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: '#0c4152'
        }, {
          lightness: 5
        }
      ]
    }, {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{
        color: '#000000'
      }]
    }, {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: '#0b434f'
        }, {
          lightness: 25
        }
      ]
    }, {
      featureType: "road.arterial",
      elementType: "geometry.fill",
      stylers: [{
        color: '#000000'
      }]
    }, {
      featureType: "road.arterial",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: '#0b3d51'
        }, {
          lightness: 16
        }
      ]
    }, {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [{
        color: '#000000'
      }]
    }, {
      elementType: "labels.text.fill",
      stylers: [{
        color: '#ffffff'
      }]
    }, {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: '#000000'
        }, {
          lightness: 13
        }
      ]
    }, {
      featureType: "transit",
      stylers: [{
        color: '#146474'
      }]
    }, {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [{
        color: '#000000'
      }]
    }, {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: '#144b53'
        }, {
          lightness: 14
        }, {
          weight: 1.4
        }
      ]
    }
  ];
  styledMap = new google.maps.StyledMapType(styles, {
    name: 'Styled Map'
  });
  cities = [
    {
      city: 'Toronto',
      desc: 'This is the best city in the world!',
      lat: 43.7000,
      long: -79.4000
    }, {
      city: 'New York',
      desc: 'This city is aiiiiite!',
      lat: 40.6700,
      long: -73.9400
    }, {
      city: 'Chicago',
      desc: 'This is the second best city in the world!',
      lat: 41.8819,
      long: -87.6278
    }, {
      city: 'Los Angeles',
      desc: 'This city is live!',
      lat: 34.0500,
      long: -118.2500
    }, {
      city: 'Las Vegas',
      desc: 'Sin City...nuff said!',
      lat: 36.0800,
      long: -115.1522
    }
  ];
  mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(40.0000, -98.0000),
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  $scope.map.mapTypes.set('map_style', styledMap);
  $scope.map.setMapTypeId('map_style');
  $scope.markers = [];
  infoWindow = new google.maps.InfoWindow();
  createMarker = function(info){
    var marker;
    console.log(info.lat);
    marker = new google.maps.Marker({
      map: $scope.map,
      position: new google.maps.LatLng(info.lat, info.long),
      title: info.city
    });
    marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
    google.maps.event.addListener(marker, 'click', function(){
      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      infoWindow.open($scope.map, marker);
    });
    $scope.markers.push(marker);
  };
  for (i$ = 0, to$ = cities.length - 1; i$ <= to$; ++i$) {
    i = i$;
    createMarker(cities[i]);
  }
  return $scope.openInfoWindow = function(e, selectedMarker){
    e.preventDefault;
    google.maps.event.trigger(selectedMarker, 'click');
  };
}));