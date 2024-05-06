"use strict";

var cube = {
  transform: {
    x: 0,
    y: 0,
    z: 0,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    centerX: 0,
    centerY: 0,
    centerZ: 0,
    rotateAxisX: 0,
    rotateAxisY: 0,
    rotateAxisZ: 0,
  },
  position: {
    x: 0,
    y: 0,
    z: 0,
    rotateAxisX: 0,
    rotateAxisY: 0,
    rotateAxisZ: 0
  },
  polygonData: [
    [
      [-1, -1, 1],
      [-1, 1, 1],
      [1, 1, 1]
    ],
    [
      [1, 1, 1],
      [1, -1, 1],
      [-1, -1, 1]
    ],
    [
      [-1, -1, -1],
      [-1, 1, -1],
      [-1, 1, 1]
    ],
    [
      [-1, 1, 1],
      [-1, -1, 1],
      [-1, -1, -1]
    ],
    [
      [1, -1, -1],
      [1, 1, -1],
      [1, 1, 1]
    ],
    [
      [1, 1, 1],
      [1, -1, 1],
      [1, -1, -1]
    ],
    [
      [-1, 1, 1],
      [-1, 1, -1],
      [1, 1, -1]
    ],
    [
      [1, 1, -1],
      [1, 1, 1],
      [-1, 1, 1]
    ],
    [
      [-1, -1, 1],
      [-1, -1, -1],
      [1, -1, -1]
    ],
    [
      [1, -1, -1],
      [1, -1, 1],
      [-1, -1, 1]
    ],
    [
      [-1, -1, -1],
      [-1, 1, -1],
      [1, 1, -1]
    ],
    [
      [1, 1, -1],
      [1, -1, -1],
      [-1, -1, -1]
    ],
  ]
}
statusCheckerSet("assets/models/cube.js", 1);
var modelCount = statusCheckerGet("ModelsReady?");
statusCheckerSet("ModelsReady?", modelCount + 1);