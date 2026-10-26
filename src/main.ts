const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

function buildFace() {
  const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  face.setAttribute("viewBox", "0 0 200 200");
  face.setAttribute("role", "img");
  face.setAttribute("aria-label", "A smiling face sticking out its tongue");

  const head = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "ellipse",
  );
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

  //tongue gradient
  const def = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const gradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient",
  );
  gradient.setAttribute("id", "tongue-gradient");
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "0%");
  gradient.setAttribute("y2", "100%");

  const stopTop = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "stop",
  );
  stopTop.setAttribute("offset", "0%");
  stopTop.setAttribute("stop-color", "#c2185b");
  gradient.append(stopTop);

  const stopBottom = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "stop",
  );
  stopBottom.setAttribute("offset", "100%");
  stopBottom.setAttribute("stop-color", "#ffc2dc");
  gradient.append(stopBottom);

  def.append(gradient);
  face.append(def);

  const tongue = document.createElementNS("http://www.w3.org/2000/svg", "path");

  tongue.setAttribute("d", "M 90 146 L 90 160 Q 100 176 110 160 L 110 146 Z");
  tongue.setAttribute("fill", "url(#tongue-gradient)");
  tongue.setAttribute("stroke", "#302c29");
  tongue.setAttribute("stroke-width", "3");
  tongue.setAttribute("stroke-linejoin", "round");
  face.append(tongue);

  const smile = document.createElementNS("http://www.w3.org/2000/svg", "path");

  smile.setAttribute("d", "M 70 130 Q 100 165 130 130");
  smile.setAttribute("fill", "none");
  smile.setAttribute("stroke", "#302c29");
  smile.setAttribute("stroke-width", "4");
  smile.setAttribute("stroke-linecap", "round");
  face.append(smile);

  return face;
}

const face = buildFace();
portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});
