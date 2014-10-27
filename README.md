angular-hierarchical-route
==========================

This module is a small complement to `ngRoute` and is of particular benefit when the routes of your application have a hierarchical structure.

This module comes with two sample applications:

* An application which uses only `ngRoute`
* An application which uses `ngRoute` in conjunction with `angular-hierarchical-route`
  to implement a more advanced routing behavior. *Please note that this sample
  could also be implemented with plain `ngRoute` with some trade-offs*.

How to run sample
-----------------
To run sample, go to the `/sample` folder and run command:

```sh
python -m SimpleHTTPServer 8888
```

Then access the **sample with basic routing** with
 [http://localhost:8888/with-route-only](http://localhost:8888/with-route-only)

Access the **sample with advanced routing** with
 [http://localhost:8888/with-helper](http://localhost:8888/with-helper)