function Drop(x, y) {
  const properties = {
    x,
    y,
  };
  const dropPrototypes = {
    show,
    move,
    hit,
  };
  return Object.assign(Object.create(dropPrototypes), properties);
  function show() {
    const drop = this;
    const {x, y} = drop;
    noStroke();
    fill(150, 0, 255);
    ellipse(x, y, dropDiameter, dropDiameter);
  }

  function move() {
    const drop = this;
    drop.y -= 10;
  }

  function hit(bouquet) {
    const drop = this;
    const {x: dropX, y: dropY} = drop;
    return bouquet.flowers.some((flower, index) => {
      const {x: flowerX, y: flowerY} = flower;
      const distance = dist(dropX, dropY, flowerX, flowerY);
      const isHit = distance < hitDistance;
      if (isHit) {
        _.pullAt(bouquet.flowers, index);
      }
      return isHit;
    });
  }
}
