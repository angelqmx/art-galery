var art_gallery = angular.module('art_gallery', ['ngMaterial', 'ngAnimate', 'ngMessages',
    'ngAria', 'ui.router']);

(function(app) {
    app.config(['$stateProvider', '$urlRouterProvider','$mdIconProvider',"$httpProvider",
        function($stateProvider, $urlRouterProvider,$mdIconProvider,$httpProvider) {

        if (typeof web3 !== 'undefined') {
          app.web3Provider = web3.currentProvider;
        } else {
          // If no injected web3 instance is detected, fall back to Ganache
          app.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        }

        $httpProvider.interceptors.push('authInterceptor');

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
        })
        .state('login', {
                url: '/login',
                templateUrl: 'partials/login-partial.html',
                controller: 'AboutController'
        });
        
        
    }]);
    app.run([ "$window","$rootScope",'$state',"storeService",function($window,$rootScope,
        $state,storeService){

        /*if(!$window.sessionStorage.token)
            storeService.login(function(result){
                if(result.auth){
                    $window.sessionStorage.token=result.token;
                }
            });*/

       /* $rootScope.$on( '$stateChangeStart', function(e, toState  , toParams
                                                   , fromState, fromParams) {

            var isLogin = toState.name === "login";
            if(isLogin){
               return; // no need to redirect 
            }

            // now, redirect only not authenticated

           
            if(!$window.sessionStorage.token) {
                e.preventDefault(); // stop current execution
                $state.go('login'); // go to login
            }
        });*/

    }]);
})(art_gallery);
