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

	$routeProvider.when('/home', {templateUrl: 'home/home.html', controller: 'HomeCtrl'});
	$routeProvider.when('/admin', {templateUrl: '../common/admin/admin.html', controller: 'AdminCityCtrl'});
	$routeProvider.when('/about', {templateUrl: '../common/about/about.html', controller: 'AppCtrl'});
	$routeProvider.otherwise({redirectTo: '/home'});
	
	hierarchyProvider.add('Ceci');
	hierarchyProvider.add('est');
	hierarchyProvider.add('une');
	hierarchyProvider.add('révolution');
	hierarchyProvider.sayHello();

}]);
