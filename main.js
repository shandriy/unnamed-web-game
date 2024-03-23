"use strict";

/*

------===========------
Konstantin Edunov, 2024
------===========------

*/

window.addEventListener("load", () => {
  let textDiv = document.getElementsByTagName("div")[0]
  textDiv.setAttribute("style", "display: none !important;");
  textDiv.remove();
  textDiv = undefined;
  const nullURI = "data:application/octet-stream;base64,";
  let assetImportArray = ["assets/gear.png"];
  let itemsLeftToLoad = assetImportArray.length;
  function loadImagesWithArray(variableReferenceArray) {
    let URLURI = nullURI;
    const length = variableReferenceArray.length;
    for (let cycle = 0; cycle < length; cycle++) {
      URLURI = variableReferenceArray[cycle];
      variableReferenceArray[cycle] = new Image();
      variableReferenceArray[cycle].addEventListener("load", () => {
        itemsLeftToLoad--;
      });
      variableReferenceArray[cycle].src = URLURI;
    };
  };
  loadImagesWithArray(assetImportArray);
  const gearIcon = assetImportArray[0];
  let deltaTime = 13, previousFrame = 0;
  let aspectRatio = 16 / 9, width = 400, height = 300;
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
    if (itemsLeftToLoad > 0) {
      drawRotatedImage(foregroundContext, gearIcon, 736, 386, 2, thisFrame / itemsLeftToLoad)
    };
    window.requestAnimationFrame(frame);
  };
  frame(13);
});