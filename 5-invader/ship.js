function Ship(options = {}) {
  const {Drop, drops} = options
  const prototypes = {
    show,
    move,
    shoot: _.throttle(shoot, 250),
  };
  const properties = {
    x: width / 2,
    direction: 0,
    Drop,
    drops,
  };
  return Object.assign(Object.create(prototypes), properties);

  function show() {
    const ship = this;
    const {x} = ship;
    // console.log(x);
    fill(255);
    rectMode(CENTER);
    rect(x, height - 20, 20, shipLength);
  }

  function move() {
    const ship = this;
    if (keyIsDown(RIGHT_ARROW)) {
      ship.x += 5;
    }
    if (keyIsDown(LEFT_ARROW)) {
      ship.x -= 5;
    }
    if (keyIsDown(32)) {
      ship.shoot();
    }
  }

  function shoot() {
    const ship = this;
    const {Drop, drops, x} = ship;
    const drop = Drop(x, height - 60);
    drops.push(drop);
  }
}
