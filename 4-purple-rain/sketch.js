const drops = [];
const dropsCount = 500;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (let i = 0; i < dropsCount; i++) {
    drops[i] = Drop();
  }
}

function draw() {
  background(230, 230, 250);
  drops.forEach((d) => {
    d.fall();
    d.show();
  });
}

function Drop() {
  const x = random(width);
  const properties = {x};
  const prototypes = {
    initialize,
    fall,
    show,
  };
  const drop = Object.assign(Object.create(prototypes), properties);
  drop.initialize();
  return drop;
}

function initialize() {
  const y = random(-500, -50);
  const z = random(0, 20);
  const yspeed = map(z, 0, 20, 4, 10);
  const length = map(z, 0, 20, 10, 20);
  const properties = {
    y,
    z,
    yspeed,
    length,
  };
  Object.assign(this, properties);
}

function fall() {
  this.y = this.y + this.yspeed;
  const gravity = map(this.z, 0, 20, 0, 0.2);
  this.yspeed = this.yspeed + gravity;
  if (this.y > height) {
    this.initialize();
  }
}

function show() {
  const {x, y, z, length} = this;
  const thick = map(z, 0, 20, 1, 3);
  strokeWeight(thick);
  stroke(138, 43, 226);
  line(x, y, x, y + length);
}
