angular.module('sample.controllers',[])
.controller('AppCtrl', ['$scope', '$location', function($scope, $location) {
	
	$scope.whenPath = function(pathToCheck) {
		return $location.path().slice(0, pathToCheck.length) === pathToCheck;
	};

}])
.controller('HomeCtrl', ['$scope', 'adminService', 'weatherService', function($scope, adminService, weatherService) {
	
	//Load existing cities
	adminService.allCities()
	.then(function(data) {
		$scope.cities = data.cities;
		$scope.countryMap = data.countryMap;
		$scope.byCountry = data.byCountry;
	});

	//Watch for city selection and query weather accordingly
	$scope.$watch('cityId', function(newId, oldId) {
		
		if (newId && (newId !== oldId)) {
			weatherService.forecast(newId)
			.then(function(data) {
				$scope.forecast = data;
			});
		}
	});
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
