(function(app) {
	app.directive('userAuthenticatedDirective', ['$window', function($window) {
		return {
			link: function($scope, elem, attrs, controller) {
				if ($window.sessionStorage.token) {
		            elem.css('display', 'block');
		        }else{
		        	elem.css('display', 'none');
		        }
			}
		};
	}]);
})(art_gallery);
