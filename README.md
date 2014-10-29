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
