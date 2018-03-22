(function(app) {
	app.directive('setToken', [ function() {
		return {
			restrict: "E",
			templateUrl: "/partials/setToken-partial.html",
			controller: function($rootScope,$scope,$window,storeService){
               $scope.user = {address:"0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef",key:"MBJO5YBN575YZJX5H6DV"};
               $scope.token = $window.sessionStorage.token;
               console.log("directiva");
               $scope.getToken = function (){
               	  storeService.login($scope.user,function(result){
               	  	if(result.auth){
	                    $window.sessionStorage.token = result.token;
	                    $scope.token = result.token;
	                    $scope.$broadcast('newToken', {
						 
						});

	                }
               	  })
               }
			},
			link: function($scope, elem, attrs) {

			}
		};
	}]);
})(art_gallery);
