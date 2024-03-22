"use strict";

/*

------===========------
Konstantin Edunov, 2024
------===========------

*/

window.addEventListener("load", () => {
  let gearLoaded = false;
  let gearIcon = new Image();
  gearIcon.addEventListener("load", () => {
    gearLoaded = true;
  });
  gearIcon.src = "assets/gear.png";
  let deltaTime = 13, previousFrame = 0;
  let aspectRatio = 16 / 9, width = 400, height = 300;
  let expectedAspectRatio = 16 / 9;
  let foreground = document.getElementById("foreground");
  let stage = document.getElementById("stage");
  let background = document.getElementById("background");
  let foregroundContext = foreground.getContext("2d", { alpha: true });
  let stageContext = stage.getContext("2d", { alpha: true });
  let backgroundContext = background.getContext("2d", { alpha: true });
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
    backgroundContext.fillStyle = "#FFFFFF";
    backgroundContext.beginPath();
    backgroundContext.rect(0, 0, width, height);
    backgroundContext.fill();
  };
  resizeCanvases();
  window.addEventListener("resize", resizeCanvases);
  function drawImage(context, image, x, y, scale) {
    let imageWidth = image.naturalWidth * scale;
    let imageHeight = image.naturalHeight * scale;
    context.drawImage(image, x, y, imageWidth, imageHeight);
  };
  function drawRotatedImage(context, image, x, y, scale, degrees) {
    let imageWidth = image.naturalWidth * scale;
    let imageHeight = image.naturalHeight * scale;
    let positionX = imageWidth / 2 * (-1);
    let positionY = imageHeight / 2 * (-1);
    context.save();
    context.translate(Math.round(x + imageWidth / 2), Math.round(y + imageHeight / 2));
    context.rotate((degrees % 360) / 57.2958);
    context.drawImage(image, positionX, positionY, imageWidth, imageHeight);
    context.restore();
  };
  function frame(thisFrame) {
    deltaTime = thisFrame - previousFrame;
    previousFrame = thisFrame;
    foregroundContext.clearRect(0, 0, width, height);
    stageContext.clearRect(0, 0, width, height);
    if (gearLoaded) {
      drawRotatedImage(foregroundContext, gearIcon, width / 2 - 64, height / 2 - 64, 2, thisFrame / 2)
      //drawImage(stageContext, gearIcon, width / 2 - 64, height / 2 - 64, 2)
    };
    window.requestAnimationFrame(frame);
  };
  frame(13);
});