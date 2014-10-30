Backbone.prototype.ASPNetRouteHandler = function(params) {

    // turn on pushState for sexy routes if browser supports history API
    if (window.history) {
        Backbone.history.start({
            pushState: true
        });
    }

    // set properties
    this.properties = {
        // override for your own use and customization
        history: new Array(),
        baseRoute: ""
    };

    // create hooks
    this.hooks = {
        beforeNavigation: function (event) { /* override me */ },
        afterNavigation: function (event) { /* override me */ }
    }

    // constructor args
    if (params) {
        if (params.baseRoute) this.properties.initialRoute = params.intialRoute;
        if (params.beforeNavigation) this.hooks.beforeNavigation = params.beforeNavigation;
        if (params.afterNavigation) this.hooks.afterNavigation = params.afterNavigation;
    }
    
    // history get/setters
    this.getHistory = function() {
        return this.properties.history;
    }

    this.addToHistory = function(route) {
        try {
            this.properties.history.push(route);
            return true;
        } catch (ex) {
            throw new Error("Backbone.ASPNetRouteHandler error: " + ex);
        }
    }

    // reference to base class
    var baseClass = this;
    
    // override Backbone.Router.initialize()
    _.extend(Backbone.Router.prototype, {
        initialize: function () {
            /* check for route & navigate to it */
            var pathName = window.location.pathname,
                activeRoute = pathName.split(baseClass.properties.intialRoute)[1];
            if (activeRoute != undefined && activeRoute != "") {
                activeRoute = "/" + activeRoute;
                // create an initial trigger for a back button
                this.navigate(baseClass.properties.pageHomeRoute, { trigger: false });
                if (baseClass.hooks.beforeNavigation) baseClass.hooks.beforeNavigation();
                this.navigate(activeRoute, { trigger: true });
                baseClass.properties.history.push(activeRoute);
                if (baseClass.hooks.afterNavigation) baseClass.hooks.afterNavigation();
            }
        }
    });
};