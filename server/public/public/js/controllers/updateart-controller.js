(function(app) {
	app.controller('updateartController', ['$scope','storeService',"$mdToast","$timeout", function($scope,storeService,
		$mdToast,$timeout) {
	   $scope.art={};
       web3 = new Web3(app.web3Provider);
       
       $scope.updateArt = function(){
       	  $scope.art.price = $scope.art.price * 0.001634;
       	  storeService.create($scope.art,function(result,error){
			if(error){
				$mdToast.show({
			        template: '<md-toast class="md-toast error" >Error saving the art</md-toast>',
			        hideDelay: 6000,
			        position: 'top right'
			    });
			}else{
				
				
				$mdToast.show({
			        template: '<md-toast class="md-toast success" >New art work saved succesfull</md-toast>',
			        hideDelay: 6000,
			        position: 'top right'
			    });
			    $timeout(function() {
			      $scope.art={};
			      $scope.artForm.$setPristine();
			      $scope.artForm.$setUntouched();
			      $scope.artForm.$submitted = false;
			    }); 
			}		
		});
       }
	}]);

	app.directive('addressInvalid', function() {
	return {
	    restrict: "A",
	    require: "ngModel",
	    link: function(scope, element, attributes, ngModel) {
	        ngModel.$validators.addressInvalid = function(modelValue) {
	            
	            return web3.isAddress(modelValue); /* forcibly returning true */

	        }
	    }
	}
});
})(art_gallery);
