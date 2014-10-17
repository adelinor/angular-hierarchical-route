/**
 * angular-hierarchical-route v0.0.1
 * https://github.com/adelinor/angular-hierarchical-route
 */
(function(window, angular, undefined) {'use strict';

var module = angular.module('angularHierarchicalRoute', [])
	.provider('hierarchy', HierarchyProvider);

'use strict';

function HierarchyProvider() {
	function inherit(parent, extra) {
	    return angular.extend(new (angular.extend(function() {}, {prototype:parent}))(), extra);
	}
	var self = this;
	
	var routes = self.routes = [];

	self.add = function(message) {
		routes.push(message);
	};
	
	self.sayHello = function() {
		console.info('Hello: ');
		for (var i = 0; i < routes.length; i++) {
			console.info(i + '>>' + routes[i]);
		}
	};
	
	this.$get = function() { return {}; };
};

})(window, window.angular);
