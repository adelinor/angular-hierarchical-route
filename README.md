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

[Read how to run the sample applications on your local machine](site/RunSampleOnLocalhost.md)

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
There is typically one route in an application which will have the main functionality
(for instance the #/home path in the
[sample application](http://adelinor.github.io/angular-hierarchical-route/sample/with-route-only)).

Some approaches:

* If possible, have the complex route as the application and the rest as static pages.
  This approach cannot be applied when other paths require dynamic behavior (for
  instance the #/admin path in the [sample](http://adelinor.github.io/angular-hierarchical-route/sample/with-route-only))

* Create a big directive for the complex route to make it into a sort of mini-application. I personally tried this approach and ended-up with a huge blob module
that did not fit in the AngularJS way.

* Using routing. With experience this is what best fits with
the AngularJS way of working. As side benefits you enable the back button
and allow to deep linking within the application (for instance the
[#/home/FR/2988507/forecast](http://adelinor.github.io/angular-hierarchical-route/sample/with-helper/#/home/FR/2988507/forecast) in the sample application)