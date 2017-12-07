const starCount = 800;
const maxR = 5;
const maxSpeed = 100;
let speed = 10;
const stars = [];
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  console.log({width});
  Array.from(Array(starCount)).forEach((star, index) => stars.push(Star()));
}

function draw() {
  const midpoint = width / 2;
  if (mouseIsPressed) {
    speed = -1;
  } else {
    speed = map(abs(mouseX - midpoint), 0, midpoint, 1, maxSpeed);
  }
  background(0);
  translate(width / 2, height / 2);
  stars.forEach((star) => {
    star.update();
    star.show();
  });
}

function Star() {
  const {x, y, z, pz} = getRandomCoordinate();
  const properties = {x, y, z, pz};
  const prototypes = {
    show,
    update,
    isOutOfBound,
  };
  const star = Object.assign(Object.create(prototypes), properties);
  return star;
}

function update() {
  this.z = this.z - speed;
  if (this.isOutOfBound()) {
    const {x, y, z, pz} = getRandomCoordinate();
    this.x = x;
    this.y = y;
    this.z = z;
    this.pz = z;
  }
}

function show() {
  fill(255);
  noStroke();
  const currentX = map((this.x) / this.z, 0, 1, 0, width);
  const currentY = map((this.y) / this.z, 0, 1, 0, height);
  const r = map(this.z, 0, width * 4, maxR, 0);
  // console.log({currentX, currentY, z: this.z});
  ellipse(currentX, currentY, r, r);

  const previousX = map(this.x / this.pz, 0, 1, 0, width);
  const previousY = map(this.y / this.pz, 0, 1, 0, height);
  this.pz = this.z;
  stroke(255);
  line(previousX, previousY, currentX, currentY);
}

function getRandomCoordinate() {
  const x = random(-width, width);
  const y = random(-width, width);
  const z = random(width * 3, width * 4);
  const pz = z;
  return {x, y, z, pz};
}

function isOutOfBound() {
  const midpoint = width / 2;
  const currentX = map((this.x) / this.z, 0, 1, 0, width);
  const currentY = map((this.y) / this.z, 0, 1, 0, height);
  const result =
    (currentX < -midpoint|| midpoint < currentX) ||
    (currentY < -midpoint|| midpoint < currentY) ||
    this.z < 1;
  return result;
}
