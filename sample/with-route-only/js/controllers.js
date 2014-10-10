angular.module('sample.controllers',[])
.controller('AppCtrl', ['$scope', 'adminService', function($scope, adminService) {
	
	//TODO
	adminService.findCityByName('NY').success(function(data) {
		console.info('Ouah fantastic! ' + data)
	});

	adminService.findCityByName('London,GB').success(function(data) {
		console.info('This works as well! ' + data)
	});

	
}]);
