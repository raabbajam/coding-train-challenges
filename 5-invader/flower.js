function Flower(x, y) {
  const properties = {
    x,
    y,
  };
  const flowerPrototypes = {
    show,
  };
  return Object.assign(Object.create(flowerPrototypes), properties);

  function show() {
    const flower = this;
    const {x, y} = flower;
    fill(255, 0, 200);
    ellipse(x, y, flowerDiameter, flowerDiameter);
  }
}
