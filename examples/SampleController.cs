using System;
using System.Web;
using System.Web.Mvc;

namespace backbone.aspnetroute.example.Controllers
{
    public class HomeController : Controller
    {
        ///
        /// Below are examples of a router that would include the following events: 
        /// var router = Backbone.Router.extend({
        /// routes: {
        ///       "/":         "index",
        ///       "about/:id":       "openFolder",
        ///       "contribute/:name": "openFolder"
        ///     },
        ///     index: function(evt) { console.log("Index triggered"); },
        ///     about: function(id) { console.log("About: " + id ); },
        ///     contribute: function(name) { console.log("Thanks for contributing, " + name); } 
        /// });
        /// 

        /// <summary>
        /// Declare your primary controller as usual.
        /// </summary>
        /// <returns>/home/index/</returns>
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Now, let's trigger some routes. This would be yourRoute.navigate("About/" + id, { trigger: true});
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult About(int? id)
        {
            return Index();
        }

        /// <summary>
        /// Or perhaps we'll have a way to submit your name towards our contributors? 
        /// yourRoute.navigate("Contribute/" + name, { trigger: true});
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public ActionResult Contribute(string name)
        {
            return Index();
        }

    }
}