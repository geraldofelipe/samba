vulpe.ng.app.controller('IndexController', ['$rootScope', '$scope', 'VulpeJS', function($rootScope, $scope, VulpeJS) {

  var vulpejs = new VulpeJS().init($scope);
  vulpejs.http.get({
    url: '/jobs',
    callback: function(data) {
      vulpejs.items = data.items;
    }
  });
}]);