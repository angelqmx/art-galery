(function(app) {
	app.controller('shopModalController', ['$scope','storeService','$mdDialog','$mdToast','art', function($scope,storeService,
		$mdDialog,$mdToast,art) {
       $scope.art=art;
       web3 = new Web3(app.web3Provider);
       
       $scope.price = ( (web3.fromWei(art.price, 'ether')/0.001634).toFixed(2));
       console.log($scope.price);
       $scope.cancel = function(){
        $mdDialog.cancel();
       };
       $scope.save = function(){
        storeService.purchase($scope.art.id,{price:$scope.art.price},function(result,error){
        	if(!error){
        		$mdToast.show({
			        template: '<md-toast class="md-toast success" >Purchase succesfull</md-toast>',
			        hideDelay: 6000,
			        position: 'top right'
			    });
			    $mdDialog.hide();
        	}else{
        		$mdToast.show({
			        template: '<md-toast class="md-toast error" >Error purchasing the art</md-toast>',
			        hideDelay: 6000,
			        position: 'top right'
			    });
        	}
        })
       };
	}]);
	
})(art_gallery);
