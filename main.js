"use strict";

window.addEventListener("DOMContentLoaded", function() {
  document.getElementsByTagName("html")[0].style.margin = "0";
  document.getElementsByTagName("body")[0].style.margin = "0";
  document.getElementsByTagName("html")[0].style.padding = "0";
  document.getElementsByTagName("body")[0].style.padding = "0";
  document.getElementsByTagName("canvas")[0].style.top = "0px";
  document.getElementsByTagName("canvas")[0].style.left = "0px";
  document.getElementsByTagName("canvas")[0].style.margin = "0";
  document.getElementsByTagName("canvas")[0].style.padding = "0";
  document.getElementsByTagName("html")[0].style.overflow = "hidden";
  document.getElementsByTagName("canvas")[0].style.position = "absolute";
  document.getElementsByTagName("canvas")[0].setAttribute("width", "500");
  document.getElementsByTagName("canvas")[0].setAttribute("height", "300");
  var canvas = document.getElementsByTagName("canvas")[0];
  var context = canvas.getContext("2d", { alpha: false });
  var pxWidth = 1;
  var pxHeight = 1;
  var unitWidth = 500;
  var unitHeight = 300;
  context.fillStyle = "#000";
  context.fillRect(0, 0, 500, 300);
  context.fill();
  function resizeCanvas(canvas) {
    var aspectRatio = 5 / 3;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var cWidth = 500;
    var cHeight = 300;
    var top = 0;
    var left = 0;
    if (width > height * aspectRatio) {
      cHeight = height;
      cWidth = height * aspectRatio;
      left = (width - cWidth) / 2;
    } else {
      cWidth = width;
      cHeight = width / aspectRatio;
      top = (height - cHeight) / 2;
    };
    top = Math.round(top);
    left = Math.round(left);
    cWidth = Math.round(cWidth);
    cHeight = Math.round(cHeight);
    canvas.style.top = top + "px";
    canvas.style.left = left + "px";
    canvas.setAttribute("width", cWidth);
    canvas.setAttribute("height", cHeight);
    context.fillStyle = "#000";
    context.fillRect(0, 0, cWidth, cHeight);
    pxWidth = cWidth / unitWidth;
    pxHeight = cHeight / unitHeight;
  };
  resizeCanvas(canvas);
  window.addEventListener("resize", function() {
    resizeCanvas(canvas);
  });
  window.addEventListener("focus", function() {
    resizeCanvas(canvas);
  });
});