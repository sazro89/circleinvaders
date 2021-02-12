let ship;
let aliens = [];
let alienQuantity = 9
let alienRows = 5;
let alienSpeed;  
let alienDirection = 1;
let rowDistance = 40;
let drops = [];
let alienDrops = [];
let alienShotProbability = .05;
let edge = 20;
let nextMoveDown = false;
let UP = -1.5;
let DOWN = 1.5;


function setup() {
  createCanvas(600, 400);
  ship = new Ship();
  for (let i = 0; i < alienRows; i++) {
    for (let j = 0; j < alienQuantity; j++) {
      aliens[i * alienQuantity + j] = new Alien(((j + 1) / (alienQuantity + 1)) * width, i * rowDistance + rowDistance);
    }
  }
}

console.log(aliens);

function draw() {
  background(51);

  alienSpeed = 10 / map(aliens.length, 0, 45, 10, 100);

  if (!ship.isEliminated()) {
    ship.show();
  }

  if (keyIsDown(LEFT_ARROW)) {
    ship.move(-0.5);
  } else if (keyIsDown(RIGHT_ARROW)) {
    ship.move(0.5);
  } 

  for (let i = aliens.length - 1; i >= 0; i-- ) {
    if (aliens[i].toDelete) {
      aliens.splice(i, 1);
    }
  }

  for (let i = drops.length - 1; i >= 0; i-- ) {
    if (drops[i].toDelete) {
      drops.splice(i, 1);
    }
  }

  for (let i = 0; i < aliens.length; i++) {
    // move all the aliens
    if (nextMoveDown === false) {
      aliens[i].move(alienSpeed * alienDirection, 0);
    } else {
      aliens[i].move(0, rowDistance / 2);
    }
  }
  
  for (let i = 0; i < aliens.length; i++) {
    // see if an alien shoots
    if (aliens[i].shoot(alienShotProbability)){
      alienDrops.push(new Drop(aliens[i].x, aliens[i].y, DOWN));
    }
  }

  for (let i = 0; i < aliens.length; i++) {
    // check for collision and update next move if needed
    if (nextMoveDown === true) {
      nextMoveDown = false;
    } else if (aliens[i].x > width - edge && alienDirection > 0) {
      alienDirection *= -1;
      nextMoveDown = true;
    } else if (aliens[i].x < edge && alienDirection < 0) {
      alienDirection *= -1;
      nextMoveDown = true;
    }
    if (nextMoveDown === true) break;
  }

  for (let i = 0; i < drops.length; i++) {
    drops[i].show();
    drops[i].move();
    for (let j = 0; j < aliens.length; j++) {
      if (drops[i].hits(aliens[j])) {
        drops[i].eliminate();
        aliens[j].eliminate();
      }
      if (drops[i].y < -50) {
        drops[i].eliminate();
      }
    }
  }

  for (let i = 0; i < alienDrops.length; i++) {
    alienDrops[i].show();
    alienDrops[i].move();
    if (alienDrops[i].hits(ship)) {
      alienDrops[i].eliminate();
      ship.eliminate();
    }
    if (alienDrops[i].y > height + 10) {
      alienDrops[i].eliminate();
    }
  }

  for (let i = 0; i < aliens.length; i++) {
    aliens[i].show();
  }
}

function keyPressed() {
  if (key === ' ') {
    if (drops.length < 3 && !ship.isEliminated) {
      let drop = new Drop(ship.x, height - 50, UP);
      drops.push(drop);
    }
  }
}
