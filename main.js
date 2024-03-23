"use strict";

/*

------===========------
Konstantin Edunov, 2024
------===========------

*/

window.addEventListener("load", () => {
  const nullURI = "data:application/octet-stream;base64,";
  let itemsLoaded = 1;
  let gearLoaded = false;
  let gearIcon = [new Image()];
  gearIcon[0].addEventListener("load", () => {
    gearLoaded = true;
    itemsLoaded++;
  });
  let assetImportArray = ["assets/gear.png"]
  function loadImagesWithArray(variableReferenceArray) {
    let URLURI = nullURI;
    let length = variableReferenceArray.length;
    for (let cycle = 0; cycle < length; cycle++) {
      URLURI = variableReferenceArray[cycle];
      variableReferenceArray[cycle] = new Image();
      gearIcon[0].addEventListener("load", () => {
        gearLoaded = true;
        itemsLoaded++;
      });
      gearIcon[0].src = "assets/gear.png";
    };
    variableReferenceArray[0] = "osu!";
  };
  loadImagesWithArray(assetImportArray);
  gearIcon[0].src = "assets/gear.png";
  let deltaTime = 13, previousFrame = 0;
  let aspectRatio = 16 / 9, width = 400, height = 300;
  const scaleWidth = 1600;
  const scaleHeight = 900;
  const expectedAspectRatio = 16 / 9;
  const foreground = document.getElementById("foreground");
  const stage = document.getElementById("stage");
  const background = document.getElementById("background");
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
  resizeCanvases();
  window.addEventListener("resize", resizeCanvases);
  window.addEventListener("focus", resizeCanvases);
  function drawImage(context, image, x, y, scale) {
    const scaleX = width / scaleWidth;
    const scaleY = height / scaleHeight;
    const imageWidth = image.naturalWidth * scale * scaleX;
    const imageHeight = image.naturalHeight * scale * scaleY;
    context.drawImage(image, x * scaleX, y * scaleY, imageWidth, imageHeight);
  };
  function drawRotatedImage(context, image, x, y, scale, degrees) {
    const scaleX = width / scaleWidth;
    const scaleY = height / scaleHeight;
    const imageWidth = image.naturalWidth * scale * scaleX;
    const imageHeight = image.naturalHeight * scale * scaleY;
    const positionX = Math.round(imageWidth / 2 * (-1));
    const positionY = Math.round(imageHeight / 2 * (-1));
    context.save();
    context.translate(Math.round(x * scaleX + imageWidth / 2), Math.round(y * scaleY + imageHeight / 2));
    context.rotate((degrees % 360) / 57.2958);
    context.drawImage(image, positionX, positionY, Math.round(imageWidth), Math.round(imageHeight));
    context.restore();
  };
  function frame(thisFrame) {
    deltaTime = thisFrame - previousFrame;
    previousFrame = thisFrame;
    foregroundContext.clearRect(0, 0, width, height);
    stageContext.clearRect(0, 0, width, height);
    if (gearLoaded && itemsLoaded > 0) {
      drawRotatedImage(foregroundContext, gearIcon[0], 736, 386, 2, thisFrame / itemsLoaded)
    };
    window.requestAnimationFrame(frame);
  };
  frame(13);
});