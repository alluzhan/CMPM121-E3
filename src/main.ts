const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
face.setAttribute("viewBox", "0 0 200 200");
face.setAttribute("role", "img");
face.setAttribute("aria-label", "A smiling face surrounded by stars");

const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
head.setAttribute("cx", "100");
head.setAttribute("cy", "100");
head.setAttribute("rx", "78");
head.setAttribute("ry", "86");
head.setAttribute("fill", "#f3cf87");
head.setAttribute("stroke", "#302c29");
head.setAttribute("stroke-width", "4");
face.append(head);

const starColors = [
  "#ff5e91",
  "#90caf7",
  "#82d286",
  "#ffca84",
  "#d5b5ff",
  "#ff9f9f",
  "#6dbeb4",
];

function makeStar(cx: number, cy: number, size: number, color: string) {
  const star = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon",
  );
  const starPoints: string[] = [];
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? size : size / 2.5;
    const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
    starPoints.push(
      `${(cx + radius * Math.cos(angle)).toFixed(1)},${
        (cy + radius * Math.sin(angle)).toFixed(1)
      }`,
    );
  }
  star.setAttribute("points", starPoints.join(" "));
  star.setAttribute("fill", color);
  return star;
}

const backdrop = document.createElementNS("http://www.w3.org/2000/svg", "svg");
backdrop.setAttribute("viewBox", "0 0 400 400");

backdrop.setAttribute("preserveAspectRatio", "xMidYMid slice");
backdrop.setAttribute("aria-hidden", "true");

backdrop.style.cssText =
  "position:fixed;inset:0;width:100%;height:100%;margin:0;z-index:-1;";

const spacing = 14;
const count = Math.ceil(400 / spacing) + 1;
for (let row = 0; row < count; row++) {
  for (let col = 0; col < count; col++) {
    const x = col * spacing + (row % 2 === 0 ? 0 : spacing / 2) - spacing / 2;
    const y = row * spacing;
    backdrop.append(
      makeStar(x, y, 3, starColors[(row + col) % starColors.length]),
    );
  }
}
portrait.append(backdrop);

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

const mouth = document.createElementNS("http://www.w3.org/2000/svg", "path");
mouth.setAttribute("d", "M 75 130 Q 100 170 125 130");
mouth.setAttribute("fill", "none");
mouth.setAttribute("stroke", "#302c29");
mouth.setAttribute("stroke-width", "3");
mouth.setAttribute("stroke-linecap", "round");
face.append(mouth);
portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});
