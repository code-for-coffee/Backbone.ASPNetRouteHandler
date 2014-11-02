/**
 * Created by James (@code4coffee) on 11/2/2014.
 *
* The MIT License (MIT)
 Copyright (c) 2014 James (@code4coffee, github.com/code-for-coffee)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 *
 */

// window attached object
window.BackboneASPNetRouteWatcher = new Object() || {};
// Create the plugin base object
Backbone.ASPNetRouteHandler = function() {
    /* properties */
    this.language = {
        AppName: "BackboneASPNetRouteHandler",
        ErrorLabel: "encountered an error",
        makeStatement: function(statement, details) {
            if (details != null || details != undefined) {
                console.log(this.lang.AppName + " " + statement + ": " + details);
            } else {
                console.log(this.lang.AppName + " " + statement);
            }
        }
    },
    this.methods = new Object() || {};
    this.model = Backbone.Model.extend({
        defaults: {
            history: new Array() || [],
            root: undefined
        }
    });
    var base = this;
    /* end properties */
    /* getters & setters */
    this.getHistory = function()
    {
        return this.model.attributes.history;
    }
    this.logHistory = function (route)
    {
        if (route) {
            try {
                this.model.attributes.history.push(route);
                return true;
            } catch(ex) {
                return false;
            }
        }
    }
    this.getUriRoot = function()
    {
        return this.model.attributes.root;
    },
    this.setUriRoot = function(uriString)
    {
        if (uriString)
        {
            try {
                this.model.attributes.root = uriString;
            } catch(ex) {
                base.language.makeStatement(base.language.ErrorLabel, ex);
                return false
            }
            return true;
        } else {
            return false;
        }
    }
    /* end getters & setters */
    this.initialize = function(uriRoot)
    {
        try {
            window.BackboneAspNetRouteWatcher = this.model.attributes;
            this.methods.initializeOverrides(uriRoot);
        } catch (ex) {
            base.language.makeStatement(base.language.ErrorLabel, ex);
        }
    };
    this.methods.initializeOverrides = function(route) {
        // override Backbone.Router.initialize()
        _.extend(Backbone.Router.prototype, {
            initialize: function ()
            {
                var vals = new Object() || {};
                vals.currentPathName = window.location.pathname;
                vals.justTriggeredRoute = vals.currentPathName.split(route)[1];
                /* check for route & navigate to it */
                if (vals.justTriggeredRoute != undefined && vals.justTriggeredRoute != "") {
                    vals.justTriggeredRoute = "/" + vals.justTriggeredRoute;
                    // create an initial trigger for a back button
                    this.navigate(window.BackboneASPNetRouteWatcher.root, { trigger: false });
                    base.model.attributes.history.push(vals.justTriggeredRoute);
                    this.navigate(vals.justTriggeredRoute, { trigger: true });
                }
            }
        });
    }
};
