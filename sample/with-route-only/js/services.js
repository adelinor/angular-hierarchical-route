/**
 * This module uses the open weather API. See practical article on
 * operations that are not limited by same origin policy
 * http://arunisrael.com/2013/08/25/accessing-external-apis-with-angularjs.html
 */
angular.module('sample.services',[])
.service('adminService', ['$http', '$q', function($http, $q) {
	
	/**
	 * @returns Promise which parameter with object for city found
	 * or undefined
	 */
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
	
	/** Cities are held in memory */
	var cities = [];
	
	/**
	 * @returns Promise which parameter of successful function
	 * is the updated list of cities
	 */
	var addCityFn = function(city) {
		var present = (! city);
		for (var i = 0; (! present) && i < cities.length; i++) {
			if (cities[i].id === city.id) {
				present = cities[i];
			}
		}
		if (! present) {
			cities.push(city);
		}
		
		var deferred = $q.defer();
		deferred.resolve(cities);
		return deferred.promise;
	};
	
	return {
		findCityByName: findCityByNameFn,
		addCity: addCityFn
	};
	//TODO
	
}]);

