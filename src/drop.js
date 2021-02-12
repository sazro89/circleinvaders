class Drop {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.r = 8;
    this.toDelete = false;
    this.dir = dir;
  }

  show() {
    fill(50, 0, 200);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  move() {
    this.y += this.dir;
  }

  hits(alien) {
    let d = dist(this.x, this.y, alien.x, alien.y);
    if (d < this.r + alien.r) {
      return true;
    } else {
      return false;
    }
  }

  eliminate() {
    this.toDelete = true;
  }
}
