angular.module('sample.controllers',[])
.controller('AppCtrl', ['$scope', '$location', function($scope, $location) {
	
	$scope.whenPath = function(pathToCheck) {
		return $location.path().slice(0, pathToCheck.length) === pathToCheck;
	};

}])
.controller('HomeCtrl', ['$scope', 'weatherService', 'resolved', 'routeCalled',
                         function($scope, weatherService, resolved, routeCalled) {
	//NDLA: with pure ng-route, you need to inject all the resolved objects and
	//      route contextual information: countries, cities, $route, $location
	
	//Set loaded data in scope
	$scope.countries = resolved.countries;
	$scope.cities = resolved.cities; //NDLA: this will be undefined in some cases
	$scope.forecast = resolved.currentWeather;

	//Set scope data bound to route parameters
	$scope.countryId = routeCalled.$routeParams.countryId;
	var id = routeCalled.$routeParams.cityId;
	$scope.cityId = (id)? Number(id) : undefined;
	
	//Mode: current or forecast
	$scope.forecastMode = false;

	//Load weather function
	var loadWeatherFn = function(cityId) {
		if ($scope.forecastMode) {
			weatherService.forecast(cityId)
			.then(function(data) {
				$scope.forecasts = data;
			});
			
		} else {
			weatherService.current(cityId)
			.then(function(data) {
				$scope.forecast = data;
			});
		}		
	};
	
	//Update mode
	$scope.toggleMode = function() {
		$scope.forecastMode = !$scope.forecastMode;
		loadWeatherFn($scope.cityId);
	};
	
	//Watch for country selection and query cities accordingly
	$scope.$watch('countryId', function(newId, oldId) {
		if (newId && (newId !== oldId)) {
			routeCalled.goToFirstWith({countryId: newId});
		}
	});

	//Watch for city selection and query weather accordingly
	$scope.$watch('cityId', function(newId, oldId) {
		
		if (newId && (newId !== oldId)) {
			//NDLA: updateOrGoToFirstWith allows to both navigate from
			//      path[n-1] to path[n] or update paramaters within path[n]
			routeCalled.updateOrGoToFirstWith({countryId: $scope.countryId, cityId: newId});
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
	adminService.cities()
	.then(function(data) {
		$scope.cities = data;
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
			$scope.cities = data;
		});
	};
}]);
