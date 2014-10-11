angular.module('sample.services',[])
.service('adminService', ['$http', function($http) {
	
	var findCityByNameFn = function(name) {
		return $http.get('http://api.openweathermap.org/data/2.5/weather', {params: {q: name}})
		.then(function(httpResponse) {
			var result = undefined;

			var data = httpResponse.data;
			if (data.cod === 200) {
				result = {
						id: data.id,
						name: data.name,
						country: data.sys.country
					};
			}
			return result;
		});
	};
	
	return {
		findCityByName: findCityByNameFn
	};
	//TODO
	
}]);

