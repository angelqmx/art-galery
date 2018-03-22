(function(app) {
	app.directive('userAnonymousDirective', ['$window', function($window) {
		return {
			restrict: "A",
			link: function($scope, elem, attrs, controller) {

				console.log(elem);
                if ($window.sessionStorage.token) {
		            elem.css('display', 'none');
		        }else{
		        	elem.css('display', 'block');
		        }
			}
		};
	}]);
})(art_gallery);
