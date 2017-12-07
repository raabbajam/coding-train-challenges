const cells = [];
const cellNumber = window.innerWidth * window.innerHeight / 10000;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (let i = 0; i < cellNumber; i++) {
    cells.push(Cell());
  }
}

function draw() {
  background(251);
  cells.forEach((cell) => {
    cell.show();
    cell.move();
  });
}

function mousePressed() {
  const newCells = [];
  cells.forEach((cell, index) => {
    if (cell.isClicked(mouseX, mouseY)) {
      newCells.push(...cell.mitosis());
      cells.splice(index, 1);
    }
  });
  cells.push(...newCells);
}
