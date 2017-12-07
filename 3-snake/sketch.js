let s = null;
let food = null;
const size = 20;
const isInfiniteMap = true;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(10);
  s = Snake();
  spawnNewFoodLocation();
}

function draw() {
  background(0);
  s.update();
  s.show();
  if (s.isFoundFood(food)) {
    s.eatFood(food);
    spawnNewFoodLocation();
  }
  fill(255, 0, 100);
  rect(food.x, food.y, size, size);
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      s.setDirection('up');
      break;
    case RIGHT_ARROW:
      s.setDirection('right');
      break;
    case DOWN_ARROW:
      s.setDirection('down');
      break;
    case LEFT_ARROW:
      s.setDirection('left');
      break;
    default:
  }
}

function mousePressed() {
  s.eatFood({s: s.x, y: s.y});
}

function Snake() {
  const properties = {};
  const prototypes = {
    initialize,
    show,
    update,
    setProperties,
    isFoundFood,
    eatFood,
    setDirection,
    dead,
  };
  const snake = Object.assign(Object.create(prototypes), properties);
  snake.initialize();
  return snake;
}

function initialize() {
  const x = 0;
  const y = 0;
  const xspeed = 1;
  const yspeed = 0;
  const cells = [];
  const direction = 'right';
  const properties = {
    x,
    y,
    xspeed,
    yspeed,
    cells,
    direction,
  };
  this.setProperties(properties);
}

function update() {
  this.cells.pop();
  this.cells.unshift({x: this.x, y: this.y});
  // this.x = constrain(this.x + this.xspeed * size, 0, width - size);
  // this.y = constrain(this.y + this.yspeed * size, 0, height - size);
  this.x = this.x + this.xspeed * size;
  this.y = this.y + this.yspeed * size;
  const isHeadOnTail = this.cells.slice(1).some((tail) => isOnSameCell(this, tail));
  const isOutOfBound = this.x < 0 || width < this.x || this.y < 0 || height < this.y;
  if (isHeadOnTail || !isInfiniteMap && isOutOfBound) {
    this.dead();
    spawnNewFoodLocation();
  }
  if (isInfiniteMap && isOutOfBound) {
    this.x = (width + this.x) % width;
    this.y = (height + this.y) % height;
  }
}

function show() {
  fill(255);
  // rect(this.x, this.y, size, size);
  this.cells.forEach(({x, y}) => rect(x, y, size, size));
}

function setProperties(newProperties) {
  Object.assign(this, newProperties);
}

function isFoundFood(food) {
  return isOnSameCell(this, food);
}

function eatFood(food) {
  this.cells.unshift({x: food.x, y: food.y});
}

function dead() {
  this.initialize();
}

function spawnNewFoodLocation() {
  const x = floor(random(width / size));
  const y = floor(random(height / size));
  food = createVector(x, y);
  food.mult(size);
}

function isOnSameCell(cell1, cell2) {
  const d = dist(cell1.x, cell1.y, cell2.x, cell2.y);
  return d < 1;
}

function setDirection(newDirection) {
  const hasTail = this.cells.length > 1;
  const oldDirection = this.direction;
  const collidingTable = {
    up: 'down',
    right: 'left',
    down: 'up',
    left: 'right',
  };
  const isColliding = collidingTable[newDirection] === oldDirection;
  if (hasTail && isColliding) {
    return null;
  }
  this.direction = newDirection;
  switch (newDirection) {
    case 'up':
      this.setProperties({xspeed: 0, yspeed: -1});
      break;
    case 'right':
      this.setProperties({xspeed: 1, yspeed: 0});
      break;
    case 'down':
      this.setProperties({xspeed: 0, yspeed: 1});
      break;
    case 'left':
      this.setProperties({xspeed: -1, yspeed: 0});
      break;
  }
}
