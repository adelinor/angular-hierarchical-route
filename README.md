angular-hierarchical-route
==========================

This module complements `ngRoute` and is of particular benefit when the routes of your application have a hierarchical structure.

This project includes two sample applications which do exactly the same thing
[(read the about section!)](http://adelinor.github.io/angular-hierarchical-route/sample/with-helper/#/about) ... but are implemented differently:

* The **/with-route-only** sample application
  [(access live demo!)](http://adelinor.github.io/angular-hierarchical-route/sample/with-route-only)
  uses `ngRoute` and nothing else
* The **/with-helper** sample application
  [(access live demo!)](http://adelinor.github.io/angular-hierarchical-route/sample/with-helper)
  uses `ngRoute` in conjunction with `angular-hierarchical-route` to implement a more
  advanced routing behavior. *Please note that this sample could also be implemented with plain `ngRoute` with some trade-offs*.

You can also run the sample applications on
[your local machine](site/RunSampleOnLocalhost.md)

Background
----------
Routing allows a developer to break an application into smaller and more
manageable chunks.
`ngRoute` with its *ng-view* directive and *$routeProvider* allows to partition an
application into several top level templates and controllers, hence helping
dealing with the **complexity**.

Routing provides two additional benefits for the end user (and for the developer
who is testing repeatedly his development):

* Allows to **use the browser's _Back_ button** to return back to a previous state
  of the application
 
* Allows to **book mark** the application in a certain state and return to it directly.
  This is also known as **deep linking**.

Why did this module come to exist?
---------------------------------

### When a view in an ng-view is itself like a mini-application
Typically one route (or more), in an application, have significant functionality.
In the sample, all views are trivial but the
[#/home](http://adelinor.github.io/angular-hierarchical-route/sample/with-route-only)
plays the role of the complex portion in the application.

Some options:

* If possible, have the complex route as the application and the rest as static pages.
  This approach cannot be applied when other paths require dynamic behavior (for
  instance the
  [#/admin](http://adelinor.github.io/angular-hierarchical-route/sample/with-route-only/#/admin)
  in the sample)

* Create a big directive for the complex route to make it into a sort of mini-application. I personally tried this approach and ended-up with a big blob module not very understandable.

* Using routing. With experience this is what best fits with
 the AngularJS way of working. As side benefits you enable the back button
 and allow to deep linking within the application (for instance the
 [#/home/FR/2988507/forecast](http://adelinor.github.io/angular-hierarchical-route/sample/with-helper/#/home/FR/2988507/forecast)
 in the sample)

How to use it?
--------------

### Registering simple routes
Routes for which you do not require sub-states, can be registered with `ngRoute`'s `$routeProvider`:

```js
$routeProvider.when('/admin', {templateUrl: '../common/admin/admin.html', controller: 'AdminCityCtrl'});
```

### When needing sub-states for a view in ng-view
This is when you create a hierarchy of routes. To create a hierachical route with
the `hierarchyProvider`:

```js
hierarchyProvider.add({
	rootPath: '/home',
	templateUrl: 'home/home.html',
	controller: 'HomeCtrl'})
```

... then you need to add all the *callable paths* within that hierarchy (including the root path). For every path you can associate a *logical name*:

```js
.callableFrom('/home','home')
	.resolve({
		countries: annotatedFnCountries
	})
.callableFrom('/home/:countryId','country')
	.resolve({
		countries: annotatedFnCountries,
		cities: annotatedFnCities
	})
```

... and conclude by *registering* that hierarchy of routes using the `$routeProvider`:

```js
.registerWith($routeProvider);
```

### Promises to resolve
As shown above you can define for every path a map of promises to *resolve*. This map
of resolved objects will be injected in the controller as an object named `resolved`:

```js
.controller('HomeCtrl', ['$scope', 'weatherService', 'resolved', 'constants', 'routeCalled',
                         function($scope, weatherService, resolved, constants, routeCalled) {
	//Set loaded data in scope
	$scope.countries = resolved.countries;
	$scope.cities = resolved.cities;

```

### Constants
Constants can be attached to a callable path. They will then be injected under
the name `constants` (see controller definition above).

In the sample application, this is used to define the view name of a nested view:

```js
.callableFrom('/home/:countryId/:cityId/forecast','forecast')
	.resolve({
		// ...
	})
	.constants({weatherView: 'home/forecast-weather.html'})
```

This view is then made visible to view by the controller:

```js
$scope.weatherView = constants.weatherView;
```

... and finally included using the `ng-include` directive:

```html
<div class="col-xs-6" ng-show="cityId" ng-include="weatherView">
</div>
```

### Injection of route context
Another object can be injected in the controller under the name `routeCalled`
which represents the route context:

* this will include the angular route services as properties: `routeCalled.$location`,
`routeCalled.$route` and `routeCalled.$routeParams`
* it provides you with a way to find out weather a route *is active* based on its *logical name*: `routeCalled.isActive('forecast')`
* a few *goTo* options (as detailed in Navigation section below)

### Navigation

#### Simple Go to
This is achieved by invoking the `routeCalled.goTo` function:

```js
routeCalled.goTo('forecast', {countryId: $scope.countryId, cityId: $scope.cityId});
```

### Go to first route which accepts the provided parameters
This function allows to find a path, not by its name, but by the *signature* of its
parameters:

```js
routeCalled.goToFirstWith({countryId: newId});
```

### Update current parameters or move on to next
When a user input bound to a *path parameter* changes, the `routeCalled.updateOrGoToFirstWith` function becomes very useful.
Typically a parameter changes either because it was `undefined` and now is set, or,
because its value was updated.

When going from *blank* to a value, this corresponds to a move further down in the
route. It is otherwise an *update* of the current route parameters:

```js
routeCalled.updateOrGoToFirstWith({countryId: $scope.countryId, cityId: newId});
```
