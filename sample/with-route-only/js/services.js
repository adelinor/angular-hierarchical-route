angular.module('sample.services',[])
.service('adminService', ['$http', function($http) {
	
	var findCityByNameFn = function(name) {
		return $http.get('http://api.openweathermap.org/data/2.5/weather', {params: {q: name}});
	};
	
	return {
		findCityByName: findCityByNameFn
	};
	//TODO
	
}]);

