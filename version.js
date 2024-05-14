"use strict";

try {
  let a, b = 0;
  const c = 0;
  function d(e) {
    if (c === b) {};
    if (c < e) {};
    const f = document.createElement("p");
    f.innerHTML = "f";
    f.style.width = "100px";
    let g = ["a", "b", "c"];
    g.sort();
    if (g.includes("d")) {};
  }
  window.requestAnimationFrame((h) => {
    d(h);
    window.setTimeout(() => {});
    setTimeout(() => {});
  });
  a = new Object();
  if (a.constructor === Object) {};
} catch (i) {
  throw new Error("Setting version...")
};
version = 1;