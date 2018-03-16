var art_gallery = angular.module('art_gallery', ['ngMaterial', 'ngAnimate', 'ngMessages',
    'ngAria', 'ui.router']);

(function(app) {
    app.config(['$stateProvider', '$urlRouterProvider','$mdIconProvider', function($stateProvider, $urlRouterProvider,
        $mdIconProvider) {

        if (typeof web3 !== 'undefined') {
          app.web3Provider = web3.currentProvider;
        } else {
          // If no injected web3 instance is detected, fall back to Ganache
          app.web3Provider = new Web3.providers.HttpProvider('http://35.172.153.129:7545');
        }
        
        $urlRouterProvider.otherwise('/');

        $mdIconProvider
        .iconSet('action', 'public/images/action-icons.svg', 24)
        .iconSet('content', 'public/images/content-icons.svg', 24);

        $stateProvider.state('updateart', {
		url: '/updateArt',
		templateUrl: 'partials/updateart-partial.html',
		controller: 'updateartController'
	})
	.state('home', {
            url: '/',
            templateUrl: 'partials/home-partial.html',
            controller: 'HomeController'
    })
    .state('about', {
            url: '/about',
            templateUrl: 'partials/about-partial.html',
            controller: 'AboutController'
        });
    }]);
})(art_gallery);
