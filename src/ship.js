class Ship {
  constructor() {
    this.x = width / 2;
    this.y = height - 20;
    this.r = 10;
    this.eliminated = false;
  }

  show() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, 20, 20);
  }

  move(val) {
    this.x += val * 5;
  }

  eliminate() {
    this.eliminated = true;
  }

  isEliminated() {
    return this.eliminated;
  }
}
