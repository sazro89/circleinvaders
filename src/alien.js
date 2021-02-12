class Alien {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.toDelete = false;
  }

  show() {
    fill(255, 0, 200);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  move(valX = 0, valY = 0) {
    this.x += valX;
    this.y += valY;
  }

  shoot(prob) {
    let shot = random(100);
    return shot < prob;
  }

  eliminate() {
    this.toDelete = true;
  }
}
