/** App */
angular.module('sample',[
                      	'sample.controllers',
                      	'sample.services',
                    	'sample.routes',
                    	'ui.bootstrap',
                    	'angularHierarchicalRoute'
                    	]);

/** Routes */
angular.module('sample.routes', ['ngRoute', 'angularHierarchicalRoute'])
.config(['$routeProvider', 'hierarchyProvider', function($routeProvider, hierarchyProvider) {
	
	/** Home */
	//Annotated functions used for home
	var annotatedFnCountries = ['adminService', function(adminService) {
		return adminService.countries();
	}];
	var annotatedFnCities = ['adminService', '$route', function(adminService, $route) {
		//NDLA: $routeParams only provides the route parameters after the route is 
		//      successfully changed.
		//      See https://docs.angularjs.org/api/ngRoute/service/$routeParams
		return adminService.citiesForCountry($route.current.params.countryId);
	}];

	hierarchyProvider.add({
		rootPath: '/home',
		templateUrl: 'home/home.html',
		controller: 'HomeCtrl'})
	.callableFrom('/home','home')
		.resolve({
			countries: annotatedFnCountries
		})
	.callableFrom('/home/:countryId','country')
		.resolve({
			countries: annotatedFnCountries,
			cities: annotatedFnCities
		})
	.callableFrom('/home/:countryId/:cityId','current')
		.resolve({
			countries: annotatedFnCountries,
			cities: annotatedFnCities,
			currentWeather: ['weatherService', '$route', function(weatherService, $route) {
				var cityId = $route.current.params['cityId'];
				if (cityId) {
					return weatherService.current(cityId);
				}
				return undefined;
			}]
		})
	.callableFrom('/home/:countryId/:cityId/forecast','forecast')
		.resolve({
			countries: annotatedFnCountries,
			cities: annotatedFnCities,
			forecastWeather: ['weatherService', '$route', function(weatherService, $route) {
				var cityId = $route.current.params['cityId'];
				if (cityId) {
					return weatherService.forecast(cityId);
				}
				return undefined;
			}]
		})
	.registerWith($routeProvider);

	$routeProvider.when('/admin', {templateUrl: '../common/admin/admin.html', controller: 'AdminCityCtrl'});
	$routeProvider.when('/about', {templateUrl: '../common/about/about.html', controller: 'AppCtrl'});
	$routeProvider.otherwise({redirectTo: '/home'});

}]);
