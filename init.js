"use strict";

var version = 0;
window.addEventListener("DOMContentLoaded", function() {
  console.log("Version latest 0.0.1 development");
  console.log("Older browsers will throw an error now.");
  console.log("This is intended and should be ignored.");
  var head = document.getElementsByTagName("head")[0];
  var versionChecker = document.createElement("script");
  versionChecker.setAttribute("type", "text/javascript");
  versionChecker.setAttribute("src", "version.js");
  head.appendChild(versionChecker);
  versionChecker.addEventListener("load", function() {
    window.setTimeout(function() {
      console.log("Success!");
      if (version == 0) {
        console.log("Running JavaScript 2008");
      } else {
        console.log("Running JavaScript 2016");
      };
    }, 500);
  });
});