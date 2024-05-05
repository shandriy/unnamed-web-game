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
  var pi = Math.PI;
  var pxWidth = 1;
  var pxHeight = 1;
  var unitWidth = 500;
  var unitHeight = 300;
  var aspectRatio = 5 / 3;
  context.fillStyle = "#000";
  context.fillRect(0, 0, 500, 300);
  context.fill();
  function resizeCanvas() {
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
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("focus", resizeCanvas);
  var square = 0;
  function frame(lastFrame) {
    var now = Date.now();
    var deltaTime = now - lastFrame;
    var width = canvas.getAttribute("width");
    var height = canvas.getAttribute("height");
    context.clearRect(0, 0, width, height);
    square = square + deltaTime / 50;
    context.fillStyle = "#f00";
    context.fillRect(square, square, 20, 20);
    context.fill();

    window.setTimeout(function() {
      frame(now)
    });
  };
  frame(Date.now());
  function batchModelBatch() {

  }
  function slicePolygonBatch() {

  }
  function projectTriangleBatch() {

  }
  function renderTriangleBatch() {

  }
});