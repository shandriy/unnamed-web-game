"use strict";

/*

------===========------
Konstantin Edunov, 2024
------===========------

*/

window.addEventListener("load", (loaded) => {
  let textDiv = document.getElementsByTagName("div")[0]
  textDiv.setAttribute("style", "display: none !important;");
  textDiv.remove();
  textDiv = undefined;
  const nullURI = "data:application/octet-stream;base64,";
  const loadScreen = ["gear"];
  const backgrounds = ["ground"];
  let itemsLeftToLoad = loadScreen.length + backgrounds.length;
  function loadImagesWithArray(variableReferenceArray, prefix, append) {
    let URLURI = nullURI;
    const length = variableReferenceArray.length;
    for (let cycle = 0; cycle < length; cycle++) {
      URLURI = variableReferenceArray[cycle];
      variableReferenceArray[cycle] = new Image();
      variableReferenceArray[cycle].addEventListener("load", () => {
        itemsLeftToLoad--;
      });
      variableReferenceArray[cycle].src = prefix + URLURI + append;
    };
  };
  loadImagesWithArray(loadScreen, "assets/images/load/", ".png");
  loadImagesWithArray(backgrounds, "assets/images/bg/", ".png");
  const gearIcon = loadScreen[0];
  const ground = backgrounds[0]
  let keysPressed = [];
  let deltaTime = loaded.timeStamp, previousFrame = 0;
  let aspectRatio = 16 / 9, width = 1920, height = 1080;
  const scaleWidth = 1600;
  const scaleHeight = 900;
  const expectedAspectRatio = 16 / 9;
  const foreground = document.getElementsByTagName("canvas")[2];
  const stage = document.getElementsByTagName("canvas")[1];
  const background = document.getElementsByTagName("canvas")[0];
  const foregroundContext = foreground.getContext("2d", { alpha: true });
  const stageContext = stage.getContext("2d", { alpha: true });
  const backgroundContext = background.getContext("2d", { alpha: true });
  function resizeCanvases() {
    aspectRatio = window.innerWidth / window.innerHeight;
    if (aspectRatio < expectedAspectRatio) {
      width = Math.round(window.innerWidth);
      height = Math.round(window.innerWidth * 1 / expectedAspectRatio);
    } else {
      width = Math.round(window.innerHeight * expectedAspectRatio);
      height = Math.round(window.innerHeight);
    };
    let top = `top:${Math.round((window.innerHeight - height) / 2)}px;`;
    let left = `left:${Math.round((window.innerWidth - width) / 2)}px;`;
    foreground.setAttribute("width", width);
    foreground.setAttribute("height", height);
    stage.setAttribute("width", width);
    stage.setAttribute("height", height);
    background.setAttribute("width", width);
    background.setAttribute("height", height);
    foreground.setAttribute("style", top + left);
    stage.setAttribute("style", top + left);
    background.setAttribute("style", top + left);
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      backgroundContext.fillStyle = "#FFFFFF";
    } else {
      backgroundContext.fillStyle = "#000000";
    };
    backgroundContext.beginPath();
    backgroundContext.rect(0, 0, width, height);
    backgroundContext.fill();
  };
  function keyDown(input) {
    let key = input.key.toString().toUpperCase();
    if (!keysPressed.includes(key)) {
      keysPressed.push(key);
    };
  };
  function keyUp(input) {
    let key = input.key.toString().toUpperCase();
    const index = keysPressed.indexOf(key);
    if (index > -1) {
      keysPressed.splice(index, 1);
    };
  };
  resizeCanvases();
  window.addEventListener("resize", resizeCanvases);
  window.addEventListener("focus", resizeCanvases);
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);
  function drawImage(context, image, cropX1, cropY1, cropX2, cropY2, x, y, scale) {
    const scaleX = width / scaleWidth;
    const scaleY = height / scaleHeight;
    const imageWidth = cropX2 * scale * scaleX;
    const imageHeight = cropY2 * scale * scaleY;
    context.drawImage(image, cropX1, cropY1, cropX2, cropY2, x * scaleX, y * scaleY, imageWidth, imageHeight);
  };
  function drawRotatedImage(context, image, cropX1, cropY1, cropX2, cropY2, x, y, scale, degrees) {
    const scaleX = width / scaleWidth;
    const scaleY = height / scaleHeight;
    const imageWidth = cropX2 * scale * scaleX;
    const imageHeight = cropY2 * scale * scaleY;
    const positionX = Math.round(imageWidth / 2 * (-1));
    const positionY = Math.round(imageHeight / 2 * (-1));
    context.save();
    context.translate(Math.round(x * scaleX + imageWidth / 2), Math.round(y * scaleY + imageHeight / 2));
    context.rotate((degrees % 360) / 57.2958);
    context.drawImage(image, cropX1, cropY1, cropX2, cropY2, positionX, positionY, Math.round(imageWidth), Math.round(imageHeight));
    context.restore();
  };
  function drawAbstract(context, image, spriteX, spriteY, spriteSize, x, y, scale, degrees, camera) {
    let xYCorrection = spriteSize * scale / 2;
    let cameraScale = 1 / camera.zoom;
    let trueScale = scale * cameraScale;
    let newX = x - xYCorrection - camera.x;
    let newY = y - xYCorrection - camera.y;
    newX *= cameraScale;
    newY *= cameraScale;
    newX += scaleWidth / 2;
    newY += scaleHeight / 2;
    drawRotatedImage(context, image, spriteX, spriteY, spriteSize, spriteSize, newX, newY, trueScale, degrees);
  };
  let camera = {
    x: 0, y: 0, zoom: 1
  }
  let player1 = {
    x: 0, y: 0, hx: 64, hy: 64,
    yVelocity: 0,
    spritesheet: gearIcon,
    externalSprites: []
  };
  let player2 = {
    x: 0, y: 0, hx: 5, hy: 2
  };
  let entities = [];
  let activeHitboxes = []
  function frame(thisFrame) {
    deltaTime = thisFrame - previousFrame;
    previousFrame = thisFrame;
    foregroundContext.clearRect(0, 0, width, height);
    stageContext.clearRect(0, 0, width, height);
    backgroundContext.clearRect(0, 0, width, height);
    if (itemsLeftToLoad > 0) {
      drawRotatedImage(foregroundContext, gearIcon, 0, 0, 64, 64, 736, 386, 2, thisFrame / itemsLeftToLoad);
    } else {
      drawImage(backgroundContext, ground, 0, 0, 1280, 720, 390.4, 500, 0.64, thisFrame / itemsLeftToLoad);
      drawImage(stageContext, player1.spritesheet, 0, 0, 64, 64, 390.4, player1.y, 0.64, thisFrame / itemsLeftToLoad);
      player1.y -= player1.yVelocity;
      player1.yVelocity -= 2 * deltaTime;
      if (player1.y > 800) {
        player1.y = 800;
        player1.yVelocity = 0;
      };
    };
    window.requestAnimationFrame(frame);
  };
  frame(13);
});