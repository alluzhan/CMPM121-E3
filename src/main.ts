//Source URL: https://wiggledraw.com/how-to-draw-a-coquette-bow/
//The bow image is free to use from wiggledraw.com
// @deno-types="./asset-url.d.ts"
import bowUrl from "./assets/bow.png?no-inline";

//Source URL: https://www.cleanpng.com/png-watercolor-cherry-blossom-corner-frame-trap3m/
//The frame image is free to use from cleanPNG.com
// @deno-types="./asset-url.d.ts"
import frameUrl from "./assets/frame.png?no-inline";

const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
face.setAttribute("viewBox", "0 0 200 200");
face.setAttribute("role", "img");
face.setAttribute(
  "aria-label",
  "A neutral face with a hair bow and cherry blossom frame",
);

const frameImage = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "image",
);
frameImage.setAttribute("href", frameUrl);
frameImage.setAttribute("x", "0");
frameImage.setAttribute("y", "0");
frameImage.setAttribute("width", "200");
frameImage.setAttribute("height", "200");
face.append(frameImage);

const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
head.setAttribute("cx", "100");
head.setAttribute("cy", "100");
head.setAttribute("rx", "78");
head.setAttribute("ry", "86");
head.setAttribute("fill", "#f3cf87");
head.setAttribute("stroke", "#302c29");
head.setAttribute("stroke-width", "4");
face.append(head);

const leftEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
leftEye.setAttribute("cx", "72");
leftEye.setAttribute("cy", "82");
leftEye.setAttribute("rx", "6");
leftEye.setAttribute("ry", "9");
leftEye.setAttribute("fill", "#302c29");
face.append(leftEye);

const rightEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
rightEye.setAttribute("cx", "128");
rightEye.setAttribute("cy", "82");
rightEye.setAttribute("rx", "6");
rightEye.setAttribute("ry", "9");
rightEye.setAttribute("fill", "#302c29");
face.append(rightEye);

const nose = document.createElementNS("http://www.w3.org/2000/svg", "line");
nose.setAttribute("x1", "100");
nose.setAttribute("y1", "96");
nose.setAttribute("x2", "96");
nose.setAttribute("y2", "112");
nose.setAttribute("stroke", "#302c29");
nose.setAttribute("stroke-width", "4");
nose.setAttribute("stroke-linecap", "round");
face.append(nose);

const mouth = document.createElementNS("http://www.w3.org/2000/svg", "line");
mouth.setAttribute("x1", "75");
mouth.setAttribute("y1", "137");
mouth.setAttribute("x2", "125");
mouth.setAttribute("y2", "137");
mouth.setAttribute("stroke", "#302c29");
mouth.setAttribute("stroke-width", "4");
mouth.setAttribute("stroke-linecap", "round");
face.append(mouth);

const bowImage = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "image",
);
bowImage.setAttribute("href", bowUrl);
bowImage.setAttribute("x", "110");
bowImage.setAttribute("y", "15");
bowImage.setAttribute("width", "60");
bowImage.setAttribute("height", "45");
bowImage.setAttribute("transform", "rotate(20 140 37.5)");
face.append(bowImage);

portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});
