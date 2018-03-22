(function(app) {
  app.factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
      request: function (config) {
       
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers["x-access-token"] =  $window.sessionStorage.token;
        }
        console.log(config);
        return config;
      },
      response: function (response) {
        if (response.status === 401) {
          // handle the case where the user is not authenticated
        }
        return response || $q.when(response);
      }
    };
  });
})(art_gallery);