"use strict";

var statusChecker = [];
function statusCheckerMake(name, value) {
  var index = statusChecker.indexOf(name);
  if (index < 0) {
    statusChecker.push(value);
    statusChecker.push(name);
  };
};
function statusCheckerSet(name, value) {
  var index = statusChecker.indexOf(name);
  if (index >= 1) {
    statusChecker[index - 1] = value;
  };
};
function statusCheckerGet(name) {
  var index = statusChecker.indexOf(name);
  if (index >= 1) {
    return statusChecker[index - 1];
  } else {
    return "FAILED 'GET'";
  };
};
function statusCheckerClear(name) {
  var index = statusChecker.indexOf(name);
  if (index >= 1) {
    statusChecker.splice([index - 1], 2);
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
    statusCheckerMake(path, 0)
    document.getElementsByTagName("head")[0].appendChild(model);
    function checkModel() {
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
  var camera = {
    coordinates: {
      x: 0,
      y: 0,
      z: 0
    },
    rotation: {
      yaw: 0,
      pitch: 0,
      roll: 0
    },
    fov: 90
  };
  function batchModelBatch(modelArray) {
    var polygonArray = [];
    var length = modelArray.length;
    for (var i = 0; i < length; i = i + 1) {
      var modelObject = modelArray[i];
      var positionsArray = [
        modelObject.transform.x
        + modelObject.position.x
        + modelObject.transform.centerX,
        modelObject.transform.y
        + modelObject.position.y
        + modelObject.transform.centerY,
        modelObject.transform.z
        + modelObject.position.z
        + modelObject.transform.centerZ];
      var transformFixer = [
        0 - modelObject.transform.centerX,
        0 - modelObject.transform.centerY,
        0 - modelObject.transform.centerZ];
      var scaleFixer = [
        modelObject.transform.scaleX,
        modelObject.transform.scaleY,
        modelObject.transform.scaleZ];
      var polygonData = modelObject.polygonData;
      var amount = polygonData.length;
      for (var j = 0; j < amount; j = j + 1) {
        polygonArray.push([]);
        var polygon = polygonData[j];
        var vertices = polygon.length;
        for (var k = 0; k < vertices; k = k + 1) {
          var vertex = polygon[k];
          polygonArray[j].push([]);
          for (var l = 0; l < 3; l = l + 1) {
            var coordinate = vertex[l] + transformFixer[l];
            coordinate = coordinate * scaleFixer[l];
            coordinate = coordinate + positionsArray[l];
            polygonArray[j][k].push(coordinate);
          };
        };
      };
    };
    return polygonArray;
  };
  function slicePolygonBatch() {

  };
  function projectTriangleBatch() {

  };
  function renderTriangleBatch() {

  };
});