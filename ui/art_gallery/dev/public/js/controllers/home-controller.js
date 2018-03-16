(function(app) {
	app.controller('HomeController', ['$scope','storeService','$mdDialog', function($scope,storeService,$mdDialog) {
		$scope.arts=[];
		storeService.query(function(result,error){
			$scope.arts=result;
			console.log($scope.arts);			
		});

		$scope.openConfirmPurchase = function(art,evt) {
        evt.preventDefault();
        var modalInstance = $mdDialog.show({
            templateUrl: '/partials/shop-modal-partial.html',
            controller: 'shopModalController',
            parent: angular.element(document.body),
            resolve: {
                art: function () {
                   return art;
                }
            }
        }).then(function(result) {
          storeService.query(function(result,error){
            $scope.arts=result;
                      
           });
        }, function() {
         
        });
    };

	}]);
})(art_gallery);
