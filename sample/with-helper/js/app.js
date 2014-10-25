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

	//Annotated allCities function
	var citiesFn = ['adminService', function(adminService) {
		return adminService.cities();
	}];
	
	/** Home */
	hierarchyProvider.add({
		rootPath: '/home',
		templateUrl: 'home/home.html',
		controller: 'HomeCtrl'})
	.callableFrom('/home','home')
		.resolve({
			cities: citiesFn
		})
	.callableFrom('/home/:countryCode','country')
		.resolve({
			cities: citiesFn
		})
//	.callableFrom('/home/:countryCode/:cityId','city')
//		.resolve({
//			cities: citiesFn,
//			currentWeather: ['weatherService', '$route', function(weatherService, $route) {
//				var cityId = $route.current.params['cityId'];
//				if (cityId) {
//					return weatherService.current(cityId);
//				}
//				return undefined;
//			}]
//		})
//	.callableFrom('/home/:countryCode/:cityId/forecast','forecast')
//		.resolve({
//			cities: citiesFn,
//			forecastWeather: ['weatherService', '$route', function(weatherService, $route) {
//				var cityId = $route.current.params['cityId'];
//				if (cityId) {
//					return weatherService.forecast(cityId);
//				}
//				return undefined;
//			}]
//		})
		.registerWith($routeProvider);

//	$routeProvider.when('/home', {templateUrl: 'home/home.html', controller: 'HomeCtrl'});
	$routeProvider.when('/admin', {templateUrl: '../common/admin/admin.html', controller: 'AdminCityCtrl'});
	$routeProvider.when('/about', {templateUrl: '../common/about/about.html', controller: 'AppCtrl'});
	$routeProvider.otherwise({redirectTo: '/home'});
	
//	hierarchyProvider.sayHello();

}]);
