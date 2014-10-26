/**
 * angular-hierarchical-route v0.1-SNAPSHOT
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
	
	/** List of hierarchical routes */
	var routes = self.routes = [];

	/** Helper for route parameters */
	var ParameterMap = function(params) {
		this.params = params;
		
		//Initialize param keys
		this.paramKeys = [];
		for (var paramName in params) {
			this.paramKeys.push(':' + paramName);
		}

	};
	ParameterMap.prototype = {
		applyToPath: function(path) {
			for (var i = 0; i < this.paramKeys.length; i++) {
				path = path.replace(this.paramKeys[i],
						this.params[this.paramKeys[i].substr(1)]);
			}
			return path;
		},
		pathHasAll: function(path) {
			var allFound = true;
			for (var i = 0; allFound && (i < this.paramKeys.length); i++) {
				allFound = path.indexOf(this.paramKeys[i]) > -1;
			}
			return allFound;
		},
		isSubsetOf: function(other) {
			var allFound = true;
			for (var i = 0; allFound && (i < this.paramKeys.length); i++) {
				allFound = other.paramKeys.indexOf(this.paramKeys[i]) > -1;
			}
			return allFound;
		},
		merge: function(other) {
			for (var i = 0; i < other.paramKeys.length; i++) {
				var paramName = other.paramKeys[i].substr(1);
				this.params[paramName] = other.params[paramName];
			}
		}
	};

	/** A route hieararchy */
	var Hierarchy = function(hierarchy) {
		this.rootPath = hierarchy.rootPath;
		this.templateUrl = hierarchy.templateUrl;
		this.controller = hierarchy.controller;
		this.callablePaths = [];
	};
	var goToFirstWithFn = function(paths, parameterMap, $location) {
		var found = undefined;
		for (var i = 0; (! found) && i < paths.length; i++) {
			var path = paths[i].path;
			if (parameterMap.pathHasAll(path)) {
				found = path;
			}
		}
		//If path found go to path
		if (found) {
			$location.path( parameterMap.applyToPath(found) );
		}
	};
	var updateOrGoToFirstWithFn = function(paths, parameterMap, $location, $route, routeParameterMap) {
		if (parameterMap.isSubsetOf(routeParameterMap)) {
			//$route.updateParams does not exist in AngularJS 1.2.x so updating with $location
			routeParameterMap.merge(parameterMap);
			var updatedPath = routeParameterMap.applyToPath($route.current.$$route.originalPath);
			$location.path( updatedPath );
		} else {
			goToFirstWithFn(paths, parameterMap, $location);
		}
	};
	var goToFn = function(logicalName, paths, parameterMap, $location) {
		var found = undefined;
		for (var i = 0; (! found) && i < paths.length; i++) {
			var callable = paths[i];
			//Compare provided name against the one of that callable path
			if (callable.logicalName === logicalName) {
				found = callable.path;
			}
		}
		//If path found go to path
		if (found) {
			$location.path( parameterMap.applyToPath(found) );
		}
	};
	/**
	 * This is to create a function within a loop, see 
	 * http://stackoverflow.com/questions/3037598/how-to-get-around-the-jslint-error-dont-make-functions-within-a-loop
	 */
	var createResolver = function(resolveObj) {
		return function($q, $injector) {
			var toResolve = {};
			for (var prop in resolveObj) {
				toResolve[prop] = $injector.invoke(resolveObj[prop]);
			}
			return $q.all(toResolve);
		};
	};
	
	Hierarchy.prototype = {
		callableFrom: function(path, logicalName) {
			var self = this;
			var c = {
				path: path,
				logicalName: logicalName
			};
			
			c.routeCalled = function($routeParams, $route, $location) {
				return {
					isActive: function(nameToCheck) {
						return nameToCheck === logicalName;
					},
					goToFirstWith: function(params) {
						return goToFirstWithFn(self.callablePaths, new ParameterMap(params), $location);
					},
					updateOrGoToFirstWith: function(params) {
						return updateOrGoToFirstWithFn(self.callablePaths, new ParameterMap(params),
								$location, $route, new ParameterMap($routeParams));
					},
					goTo: function(name, params) {
						return goToFn(name, self.callablePaths, new ParameterMap(params), $location);
					},
					$routeParams: $routeParams,
					$route: $route,
					$location: $location
				};
			};

			this.callablePaths.push(c);
			return this;
		},
		resolve: function(toResolve) {
			var c = this.callablePaths[this.callablePaths.length - 1];
			c.resolve = toResolve;
			return this;
		},
		registerWith: function($routeProvider) {
			for (var j = 0; j < this.callablePaths.length; j++) {
				var callablePath = this.callablePaths[j];
				$routeProvider.when(callablePath.path, {
					templateUrl: this.templateUrl,
					controller: this.controller,
					resolve: {
						routeCalled: callablePath.routeCalled,
						resolved: createResolver(callablePath.resolve)
					}
				});
			}
		}
	};

	/** 
	 * Adds a hierarchy
	 * @returns newly created hierarchy.
	 */
	self.add = function(hierarchy) {
		var result = new Hierarchy(hierarchy);
		routes.push(result);
		return result;
	};
	
	self.sayHello = function() {
		console.info('Hello: ');
		for (var i = 0; i < routes.length; i++) {
			console.info(i + '>>' + routes[i].callablePaths.length);
		}
	};
	
	this.$get = function() { return {}; };
};

})(window, window.angular);
