Backbone.ASPNetRouteHandler
===========================

A plugin for ASP.NET environments to use the pushState API easily

Usage
===

Intialization:

`var routeHelper = new Backbone.ASPNetRouteHelper({
  initialRoute: "",
  beforeNavigation: function() { console.log("Hey, route is being triggerd") },
  afterNavigation: function() { console.log("The party is over."); }
});`

Getting Route History:
`routeHelper.getHistory();` 
