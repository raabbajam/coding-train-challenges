// let a = 0;
let b = null;
let sponge = [];
function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  b = Box(0, 0, 0, 200);
  sponge.push(b);
}

function draw() {
  background(51);
  stroke(255);
  noFill();
  // translate(width / 2, height / 2);
  rotateX(frameCount * 0.003 * 1);
  rotateY(frameCount * 0.003 * 2);
  rotateZ(frameCount * 0.003 * 3);
  sponge.forEach((box) => box.show());
}

function Box(x, y, z, r) {
  const properties = {x, y, z, r};
  const prototypes = {
    show,
    generate,
  };
  const box = Object.assign(Object.create(prototypes), properties);
  return box;
}

function show() {
  const {x, y, z, r} = this;
  push();
  translate(x, y, z);
  noFill();
  stroke(255);
  box(r, r, r);
  pop();
}

function generate() {
  const {x, y, z, r} = this;
  const newR = r / 3;
  const boxes = [];
  const oldPos = [x, y, z];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      for (let k = -1; k <= 1; k++) {
        const [newX, newY, newZ] = [i, j, k].map((pos, index) => oldPos[index] + pos * newR);
        if ([i, j, k].reduce((sum, pos) => sum + abs(pos), 0) > 1) {
          const box = Box(newX, newY, newZ, newR);
          boxes.push(box);
        }
      }
    }
  }
  return boxes;
}

function mousePressed() {
  const next = [];
  sponge.forEach((box) => next.push(...box.generate()))
  sponge = next;
}
