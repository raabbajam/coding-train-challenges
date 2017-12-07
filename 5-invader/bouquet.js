function Bouquet() {
  const properties = {
    flowers: [],
    direction: 1,
  };
  const prototypes = {
    create,
    show,
    move: _.throttle(move, 100),
    down,
  };
  return Object.assign(Object.create(prototypes), properties);

  function show() {
    const bouquet = this;
    bouquet.flowers.forEach((flower) => flower.show());
    if (bouquet.gameOver) {
      textSize(100);
      textAlign(CENTER);
      fill(255);
      text('game over', width/2, height/2);
    }
  }

  function move() {
    let shouldMoveDown = false;
    bouquet.flowers.forEach((flower) => {
      flower.x += 10 * bouquet.direction;
      if (flower.x < (0 + flowerDiameter) || flower.x > (width - flowerDiameter)) {
        shouldMoveDown = true;
      }
    });
    if (shouldMoveDown) {
      bouquet.direction *= -1;
      bouquet.down();
    }
  }

  function down() {
    let isGameOver = false;
    bouquet.flowers.forEach((flower) => {
      flower.y += 30;
      if (flower.y >= flowerFinishLine) {
        isGameOver = true;
      }
    });
    if (isGameOver) {
      bouquet.flowers = [];
      bouquet.gameOver = 1;
    }
  }

  function create() {
    let i = 0
    let j = 0;
    while (true) {
      let x = i * 80 + 80;
      let y = j * 100 + 60;
      if (y > verticalLimit) {
        break;
      }
      if (x > horizontalLimit) {
        y += 100;
        j++;
        i = 0;
      } else {
        const flower = Flower(x, y);
        bouquet.flowers.push(flower);
        i++;
      }
    }
  }
}
