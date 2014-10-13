angular.module('sample.controllers',[])
.controller('AppCtrl', ['$scope', '$location', 'adminService', function($scope, $location, adminService) {
	
	$scope.whenPath = function(pathToCheck) {
		return $location.path().slice(0, pathToCheck.length) === pathToCheck;
	};
	
}])
.controller('AdminCityCtrl', ['$scope', 'adminService', function($scope, adminService) {
	
	//Load countries
	adminService.allCountries()
	.then(function(data) {
		$scope.countries = data;
	});
	
	//Load existing cities
	adminService.allCities()
	.then(function(data) {
		$scope.cities = data.cities;
	});
	
	$scope.add = function() {
		$scope.errorMessage = undefined;
		$scope.successMessage = undefined;
		adminService.findCityByName($scope.searchName, $scope.country.code)
		.then(function(data) {
			if (! data) {
				$scope.errorMessage = "Could not find a city with name '" +
					$scope.searchName + "' in " + $scope.country.name;
			} else {
				$scope.successMessage = "Added city '" + data.name + "'";
			}
			return adminService.addCity(data);
		})
		.then(function(data) {
			$scope.cities = data.cities;
		});
	};
}]);
