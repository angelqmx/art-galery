(function(app) {
	app.service('storeService', ['$http', function($http) {
       var storeService={};
       var root = "http://localhost:3000";
       //var root = "";
       storeService.query= function(callback){
       	  $http({
		  method: 'GET',
		  url: root+'/api/stores'
		  }).then(function(result){
		  	callback(result.data,null);
		  }, function(error){
		  	callback(null,error);
		  });
       };

       storeService.create= function(params, callback){
       	  $http({
		  method: 'POST',
		  url: root+'/api/stores',
		  data: params,
		  }).then(function(result){
		  	callback(result.data,null);
		  }, function(error){
		  	callback(null,error);
		  });
       };

       storeService.purchase= function(id,params, callback){
       	  $http({
		  method: 'PUT',
		  url: root+'/api/stores/purchase/'+id,
		  data: params,
		  }).then(function(result){
		  	callback(result.data,null);
		  }, function(error){
		  	callback(null,error);
		  });
       };

       storeService.login= function(param,callback){
       	  $http({
		  method: 'POST',
		  url: root+'/api/login',
		  data:param
		  }).then(function(result){
		  	callback(result.data,null);
		  }, function(error){
		  	callback(null,error);
		  });
       };

       return storeService;
	}]);
})(art_gallery);
