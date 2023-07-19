class Router {
  static hardwareBack = false;
  static softwareBack = false;

  static navigate(routeTitle, routePath, replaceState) {
  if (routePath !== "") {
      try {
      var currentRoute = window.location.href;
      var routeSplits = currentRoute.split("?");
      var newRoute = routeSplits[0];
      var page = "?page=";

      if (routeSplits.length < 2) {
          newRoute += page + routePath;
      } else if (routeSplits[1].includes("page=")) {
          var dataInParams = routeSplits[1].includes("&");
          var pageSearchRegex;

          if (dataInParams) {
          pageSearchRegex = /page=(.*?)\&/;
          } else {
          pageSearchRegex = /page=(.*)/;
          }
          var newUrl = routeSplits[1].replace(pageSearchRegex, page + routePath + (dataInParams ? "&" : ""));
          newRoute += newUrl;
      } else {
          newRoute += page + routePath + "&" + routeSplits[1];
      }
      debugger;
      if (replaceState) {
          window.history.replaceState(null, routeTitle, newRoute);
      } else {
          window.history.pushState(null, routeTitle, newRoute);
      }

      } catch (e) {
      console.info("HyperSDK - Error in history push : ", e);
      }
  }
  };

  static navigateBack() {
  if (Router.hardwareBack) {
      Router.hardwareBack = false;
  } else {
      Router.softwareBack = true;
      window.history.back();
  }

  }

  static backpress(popstateEvent) {
  console.log(popstateEvent)
  if (Router.softwareBack) {
      Router.softwareBack = false;
  } else {
      Router.hardwareBack = true;
      window.postMessage(JSON.stringify({ name: "backpress" }), "*");
  }
  }

  }
  window.addEventListener('popstate', function (event) {
  // Log the state data to the console
  Router.backpress(event);
  });


/* MANDATORY OS DECLARATION */
window.__OS = "WEB"


/* HACKS */
window.JOS = {};
const JBridge = {};
JBridge.getSessionInfo = () => "{}";

/* REQUIRED FOR ROUTING */
window.JBridge = window.JBridge || {};
window.JBridge.getRouter = function() {return Router;}
