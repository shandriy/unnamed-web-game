"use strict";

var statusChecker1 = undefined;
var statusChecker2 = undefined;
var statusChecker3 = undefined;
var statusChecker4 = undefined;
var statusChecker5 = undefined;
var statusChecker6 = undefined;
var statusChecker7 = undefined;
var statusChecker8 = undefined;
var statusChecker9 = undefined;
var statusChecker10 = undefined;
var statusChecker11 = undefined;
var statusChecker12 = undefined;
var statusChecker13 = undefined;
var statusChecker14 = undefined;
var statusChecker15 = undefined;
var statusChecker16 = undefined;
function statusCheckerSet(name, change) {
  if (statusChecker9 == name) {
    var statusChecker1 = change(statusChecker1);
    return;
  };
  if (statusChecker10 == name) {
    var statusChecker2 = change(statusChecker2);
    return;
  };
  if (statusChecker11 == name) {
    var statusChecker3 = change(statusChecker3);
    return;
  };
  if (statusChecker12 == name) {
    var statusChecker4 = change(statusChecker4);
    return;
  };
  if (statusChecker13 == name) {
    var statusChecker5 = change(statusChecker5);
    return;
  };
  if (statusChecker14 == name) {
    var statusChecker6 = change(statusChecker6);
    return;
  };
  if (statusChecker15 == name) {
    var statusChecker7 = change(statusChecker7);
    return;
  };
  if (statusChecker16 == name) {
    var statusChecker8 = change(statusChecker8);
    return;
  };
};
function statusCheckerCreate(name, value) {
  if (statusChecker9 == name) {
    return;
  };
  if (statusChecker10 == name) {
    return;
  };
  if (statusChecker11 == name) {
    return;
  };
  if (statusChecker12 == name) {
    return;
  };
  if (statusChecker13 == name) {
    return;
  };
  if (statusChecker14 == name) {
    return;
  };
  if (statusChecker15 == name) {
    return;
  };
  if (statusChecker16 == name) {
    return;
  };
  if (statusChecker9 == undefined) {
    statusChecker1 = value;
    statusChecker9 = name;
    return;
  };
  if (statusChecker10 == undefined) {
    statusChecker2 = value;
    statusChecker10 = name;
    return;
  };
  if (statusChecker11 == undefined) {
    statusChecker3 = value;
    statusChecker11 = name;
    return;
  };
  if (statusChecker12 == undefined) {
    statusChecker4 = value;
    statusChecker12 = name;
    return;
  };
  if (statusChecker13 == undefined) {
    statusChecker5 = value;
    statusChecker13 = name;
    return;
  };
  if (statusChecker14 == undefined) {
    statusChecker6 = value;
    statusChecker14 = name;
    return;
  };
  if (statusChecker15 == undefined) {
    statusChecker7 = value;
    statusChecker15 = name;
    return;
  };
  if (statusChecker16 == undefined) {
    statusChecker8 = value;
    statusChecker16 = name;
    return;
  };
};
function statusCheckerClear(name) {
  if (statusChecker9 == name) {
    statusChecker1 = undefined;
    statusChecker9 = undefined;
    return;
  };
  if (statusChecker10 == name) {
    statusChecker2 = undefined;
    statusChecker10 = undefined;
    return;
  };
  if (statusChecker11 == name) {
    statusChecker3 = undefined;
    statusChecker11 = undefined;
    return;
  };
  if (statusChecker12 == name) {
    statusChecker4 = undefined;
    statusChecker12 = undefined;
    return;
  };
  if (statusChecker13 == name) {
    statusChecker5 = undefined;
    statusChecker13 = undefined;
    return;
  };
  if (statusChecker14 == name) {
    statusChecker6 = undefined;
    statusChecker14 = undefined;
    return;
  };
  if (statusChecker15 == name) {
    statusChecker7 = undefined;
    statusChecker15 = undefined;
    return;
  };
  if (statusChecker16 == name) {
    statusChecker8 = undefined;
    statusChecker16 = undefined;
    return;
  };
};
function statusCheckerGet(name) {
  if (statusChecker9 == name) {
    return statusChecker1;
  };
  if (statusChecker10 == name) {
    return statusChecker2;
  };
  if (statusChecker11 == name) {
    return statusChecker3;
  };
  if (statusChecker12 == name) {
    return statusChecker4;
  };
  if (statusChecker13 == name) {
    return statusChecker5;
  };
  if (statusChecker14 == name) {
    return statusChecker6;
  };
  if (statusChecker15 == name) {
    return statusChecker7;
  };
  if (statusChecker16 == name) {
    return statusChecker8;
  };
};
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
  var loadedModels = [];
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
  function loadModel(path) {
    var model = document.createElement("script");
    model.setAttribute("src", path);
    model.setAttribute("type", "text/javascript");
    statusCheckerCreate(path, 0)
    document.getElementsByTagName("head")[0].appendChild(model);
    function checkModel() {
      console.log(statusCheckerGet(path));
      if (statusCheckerGet(path) == 0) {
        window.setTimeout(checkModel, 50);
      } else {
        statusCheckerClear(path);
        loadedModels.push(path);
      };
    };
    checkModel();
  };
  loadModel("assets/models/cube.js");
  function batchModelBatch() {

  };
  function slicePolygonBatch() {

  };
  function projectTriangleBatch() {

  };
  function renderTriangleBatch() {

  };
});