"use strict";

/*
---------==================================---------
Copyright 2024 Konstantin Edunov

THIS NOTICE MAY NOT BE REMOVED FROM ANY SOURCE
REDISTRIBUTIONS OF THIS PROGRAM. IT MAY NOT BE
MODIFIED OR CHANGED IN ANY WAY BY ANY OTHERS BESIDES
THE ORIGINAL AUTHORS.

This program is licensed under the GNU V3 general
public license. This means that it is completely
free and you may redistribute it as you wish as long
as the following terms are met:
- Redistributions must be under the same license.
(GNU GPLv3)
- The source must be stated.
- All changes must be stated.
- A copyright notice must be included.

THIS LIST IS NOT CONCLUSIVE; ANYTHING MENTIONED IN
THIS LIST IS ONLY TO GIVE THE READER A BRIEF IDEA OF
THE LICENSING. FOR DETAILS, THE LICENSE CAN BE FOUND
IN THE COPYING FILE IN THE ROOT DIRECTORY, AS WELL
AS AT THE FOLLOWING URL:
www.gnu.org/licenses/gpl-3.0-standalone.html

If this is a source redistribution, it should
include the GNU GPLv3 license. If you can not find
it or it is missing, you can find it at the above
listed URL. Alternatively, see the URL
www.gnu.org/licenses for more information and
detail.

THIS PROGRAM DOES NOT COME WITH WARRANTY OF ANY
KIND. KONSTANTIN EDUNOV, OR ANY OTHER AUTHORS OR
CONTRIBUTORS ARE NOT RESPONSIBLE FOR MISUSE OF
THE PROGRAM OR IF IT DOES WORK AS EXPECTED.

AS STATED ABOUT THE LIST, NOTHING IN THIS NOTICE
IS CONCLUSIVE. ANY CONTRADICTIONS BETWEEN THE GNU
GPLv3 LICENSE AND THIS NOTICE ARE PURELY ACCIDENTAL
AND THE AUTHORS OF THIS PROGRAM MAY NOT BE HELD
LIABLE FOR MISUSE DUE TO THIS. IF YOU ARE UNSURE,
THE GNU GPLv3 LICENSE WILL ALWAYS BE PRIORITIZED IN
ANY CONTRADICTIONS.

https://www.gnu.org/licenses/gpl-3.0-standalone
https://www.gnu.org/licenses/gpl-3.0-standalone.html
https://www.gnu.org/licenses
www.gnu.org/licenses/gpl-3.0-standalone
www.gnu.org/licenses/gpl-3.0-standalone.html
www.gnu.org/licenses
/COPYING

/COPYING refers to the root directory of this
program. This also applies for the mention of the
./COPYING path in a few lines from here

A local version should be provided here: ./COPYING
This is assuming neither this file nor the license
have been moved.
---------==================================---------
*/

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
  statusCheckerMake("ModelsReady?", 0);
  var html = document.getElementsByTagName("html")[0];
  var body = document.getElementsByTagName("body")[0];
  var canvas = document.getElementsByTagName("canvas")[0];
  html.style.margin = "0";
  body.style.margin = "0";
  html.style.padding = "0";
  body.style.padding = "0";
  canvas.style.top = "0px";
  canvas.style.left = "0px";
  canvas.style.margin = "0";
  canvas.style.padding = "0";
  html.style.overflow = "hidden";
  canvas.style.position = "absolute";
  canvas.setAttribute("width", "500");
  canvas.setAttribute("height", "300");
  var context = canvas.getContext("2d", { alpha: false });
  var pi = Math.PI;
  var radians = pi / 180;
  var pxWidth = 1;
  var pxHeight = 1;
  var unitWidth = 500;
  var unitHeight = 300;
  var aspectRatio = unitWidth / unitHeight;
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

    cube.position.x += deltaTime / 1000;
    cube.position.z += deltaTime / 500;
    var polygonBatch = batchModelBatch([cube]);
    var renderBatch = projectTriangleBatch(polygonBatch, camera);
    renderTriangleBatch(renderBatch);

    window.setTimeout(function() {
      frame(now)
    });
  };
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
  window.setTimeout(function() {
    function ifReady() {
      var get = statusCheckerGet("ModelsReady?");
      if (get >= 1) {
        frame(Date.now());
      } else {
        window.setTimeout(ifReady, 50);
      };
    };
    ifReady();
  }, 200)
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
    fov: 90,
    renderDistance: 200
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
        + modelObject.transform.centerZ
      ];
      var transformFixer = [
        0 - modelObject.transform.centerX,
        0 - modelObject.transform.centerY,
        0 - modelObject.transform.centerZ
      ];
      var scaleFixer = [
        modelObject.transform.scaleX,
        modelObject.transform.scaleY,
        modelObject.transform.scaleZ
      ];
      var polygonData = modelObject.polygonData;
      var amount = polygonData.length;
      for (var j = 0; j < amount; j = j + 1) {
        polygonArray.push([[]]);
        var polygon = polygonData[j][0];
        var vertices = polygon.length;
        for (var k = 0; k < vertices; k = k + 1) {
          var vertex = polygon[k];
          var coordinates = vertex.length;
          polygonArray[j][0].push([]);
          for (var l = 0; l < 3; l = l + 1) {
            var coordinate = vertex[l] + transformFixer[l];
            coordinate = coordinate * scaleFixer[l];
            coordinate = coordinate + positionsArray[l];
            polygonArray[j][0][k].push(coordinate);
          };
          for (var l = 3; l < coordinates; l = l + 1) {
            polygonArray[j][0][k].push(vertex[l]);
          };
        };
        polygonArray[j].push(polygonData[j][1]);
      };
    };
    return polygonArray;
  };
  function slicePolygonBatch() {

  };
  function projectTriangleBatch(triangleArray, camera) {
    var renderArray = [];
    var length = triangleArray.length;
    var distance = Math.round(Math.tan(camera.fov / 2 * radians) * unitWidth / 2);
    var cameraPosition = [
      camera.coordinates.x,
      camera.coordinates.y,
      camera.coordinates.z
    ];
    for (var i = 0; i < length; i = i + 1) {
      renderArray.push([[]]);
      var triangle = triangleArray[i][0];
      var colorDistances = [];
      for (var j = 0; j < 3; j = j + 1) {
        renderArray[i][0].push([]);
        var vertex = triangle[j];
        var vertices = vertex.length;
        var vertexFixed = [
          vertex[0] - cameraPosition[0],
          vertex[1] - cameraPosition[1],
          vertex[2] - cameraPosition[2]
        ];
        colorDistances.push(vertexFixed[2]);
        var multiplier = distance / vertexFixed[2];
        for (var k = 0; k < 2; k = k + 1) {
          renderArray[i][0][j].push(vertexFixed[k] * multiplier);
        };
        for (var k = 3; k < vertices; k = k + 1) {
          renderArray[i][0][j].push(vertex[k]);
        };
      };
      var colorDistance = 0;
      for (var j = 0; j < 3; j = j + 1) {
        colorDistance = colorDistance + colorDistances[j];
      };
      colorDistance = colorDistance / 3;
      var color = triangleArray[i][1];
      var colorModifier = 1 - (colorDistance / camera.renderDistance);
      for (var j = 0; j < 3; j = j + 1) {
        color[j] = Math.round(color[j] * colorModifier);
      };
      renderArray[i].push(color);
    };
    return renderArray;
  };
  function renderTriangleBatch(renderArray) {
    var width = canvas.getAttribute("width");
    var height = canvas.getAttribute("height");
    var convertWidth = unitWidth / 2;
    var convertHeight = unitHeight / 2;
    context.clearRect(0, 0, width, height);
    var length = renderArray.length;
    for (var i = 0; i < length; i = i + 1) {
      var triangle = renderArray[i][0];
      var color = renderArray[i][1];
      context.fillStyle =
        "rgb(" +
          color[0] + "," +
          color[1] + "," +
          color[2] +
        ")";
      context.beginPath();
      context.moveTo(
        Math.round((triangle[0][0] + convertWidth) * pxWidth),
        Math.round((triangle[0][1] + convertHeight) * pxHeight)
      );
      for (var j = 1; j < 3; j = j + 1) {
        context.lineTo(
          Math.round((triangle[j][0] + convertWidth) * pxWidth),
          Math.round((triangle[j][1] + convertHeight) * pxHeight)
        );
      };
      context.fill();
      context.closePath();
    };
  };
});
