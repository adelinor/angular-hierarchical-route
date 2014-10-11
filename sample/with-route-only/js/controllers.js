angular.module('sample.controllers',[])
.controller('AppCtrl', ['$scope', 'adminService', function($scope, adminService) {
	
	//TODO
	
}])
.controller('AdminCityCtrl', ['$scope', 'adminService', function($scope, adminService) {
	$scope.add = function() {
		$scope.errorMessage = undefined;
		$scope.successMessage = undefined;
		adminService.findCityByName($scope.searchName)
		.then(function(data) {
			if (! data) {
				$scope.errorMessage = "Could not find a city with name '" + $scope.searchName + "'";
			} else {
				$scope.successMessage = "Added city '" + data.name + "'";
			}
			return adminService.addCity(data);
		})
		.then(function(cities) {
			$scope.cities = cities;
		});
	};
}]);
