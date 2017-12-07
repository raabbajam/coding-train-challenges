const flowerDiameter = 60;
const dropDiameter = 16;
const shipLength = 40;
const flowerFinishLine = window.innerHeight - shipLength - (flowerDiameter / 2);
const hitDistance = (dropDiameter + flowerDiameter) / 2;
const verticalLimit = window.innerHeight - (4 * flowerDiameter);
const horizontalLimit = window.innerWidth - (4 * flowerDiameter);
let ship = null;
let bouqet = null;
const drops = [];
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  ship = Ship({drops, Drop});
  bouquet = Bouquet();
  bouquet.create();
}

function draw() {
  background(51);
  ship.show();
  ship.move();
  bouquet.show();
  bouquet.move();
  drops.forEach((drop, index) => {
    drop.show();
    drop.move();
    if (drop.hit(bouquet)) {
      _.pullAt(drops, index);
    }
  });
}
