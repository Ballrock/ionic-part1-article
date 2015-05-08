'use strict';

angular.module('icysoft', ['ionic','controller'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('base',
  {
    url:'/icysoft',
    abstract: true,
    templateUrl: 'tpl/base.html'
  })
  .state('base.icysoft',
  {
    url: '/accueil',
    views: {
      'accueil': {
        templateUrl: 'tpl/accueil.html',
        controller: 'AccueilCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/icysoft/accueil');
});
