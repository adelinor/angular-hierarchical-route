angular.module('sample',[
                      	'sample.controllers',
                    	'sample.routes',
                    	'ui.bootstrap'
                    	]);

//To be included later
//'sample.services',

angular.module('sample.controllers',[])
.controller('AppCtrl', ['$scope', function($scope) {
	
	//TODO
	
}]);


angular.module('sample.routes', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/home', {templateUrl: 'home/home.html', controller: 'AppCtrl'});
	$routeProvider.when('/admin', {templateUrl: 'admin/admin.html', controller: 'AppCtrl'});
	$routeProvider.when('/about', {templateUrl: 'about/about.html', controller: 'AppCtrl'});
	$routeProvider.otherwise({redirectTo: '/home'});

}]);
