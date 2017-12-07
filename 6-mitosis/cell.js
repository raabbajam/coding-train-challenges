function Cell(options = {}) {
  const {
    pos,
    radius = random(50, 200),
    velocity = p5.Vector.random2D(),
    color: cellColor = getColor(),
  } = options;
  const properties = {
    pos: pos ? pos.copy() : createVector(random(width), random(height)),
    radius,
    color: cellColor,
    velocity,
  };
  const prototypes = {
    show,
    move,
    isClicked,
    mitosis,
  };
  const cell = Object.assign(Object.create(prototypes), properties);
  return cell;

  function show() {
    const cell = this;
    noStroke();
    fill(cell.color);
    ellipse(cell.pos.x, cell.pos.y, cell.radius, cell.radius);
  }

  function move() {
    const cell = this;
    const shouldChangeDirection = Math.floor(random(0, 20)) === 0;
    if (shouldChangeDirection) {
      cell.velocity = p5.Vector.random2D();
    }
    cell.pos.add(cell.velocity);
  }

  function isClicked(x, y) {
    const cell = this;
    const distance = dist(cell.pos.x, cell.pos.y, x, y);
    return distance < cell.radius / 2;
  }

  function mitosis() {
    const cell = this;
    const offset = random(cell.radius / 5, cell.radius / 4);
    const cellA = createMitosisCell(-offset);
    const cellB = createMitosisCell(offset);
    return [cellA, cellB];

    function createMitosisCell(offset) {
      const pos = cell.pos.copy();
      pos.x += offset;
      pos.y += offset;
      return Cell({pos, radius: cell.radius * 0.8, color: cell.color})
    }
  }
}

function getColor() {
  const alpha = 120;
  const rgb = [random(0, 100), random(0, 100), random(100, 255)];
  return color(..._.shuffle(rgb), alpha);
}
