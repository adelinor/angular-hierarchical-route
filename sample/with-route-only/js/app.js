/** App */
angular.module('sample',[
                      	'sample.controllers',
                      	'sample.services',
                    	'sample.routes',
                    	'ui.bootstrap'
                    	]);

/** Routes */
angular.module('sample.routes', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/home', {templateUrl: 'home/home.html', controller: 'AppCtrl'});
	$routeProvider.when('/admin', {templateUrl: 'admin/admin.html', controller: 'AppCtrl'});
	$routeProvider.when('/about', {templateUrl: 'about/about.html', controller: 'AppCtrl'});
	$routeProvider.otherwise({redirectTo: '/home'});

}]);
