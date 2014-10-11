angular.module('sample.controllers',[])
.controller('AppCtrl', ['$scope', 'adminService', function($scope, adminService) {
	
	//TODO
	adminService.findCityByName('NY').success(function(data) {
		console.info('Ouah fantastic! ' + data)
	});

	adminService.findCityByName('London,GB').success(function(data) {
		console.info('This works as well! ' + data)
	});

	
}])
.controller('AdminCityCtrl', ['$scope', 'adminService', function($scope, adminService) {
	$scope.cities = [];
	
	$scope.add = function() {
		$scope.errorMessage = undefined;
		adminService.findCityByName($scope.searchName)
		.then(function(data) {
			if (! data) {
				$scope.errorMessage = "Could not find a city with name '" + $scope.searchName + "";
			} else {
				$scope.cities.push(data);
			}
		});
	};
}]);
