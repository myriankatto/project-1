const BLOCK_SIZE = 45;

class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.$canvas.height = $canvas.height;
    this.$canvas.width = $canvas.width;
    this.context = this.$canvas.getContext('2d');

    this.character = new Character(this);
    this.character.setKeyboardEventListeners();

    this.timer = 0;
    this.speed = 1000;
    this.speedLevel = 4000;

    this.obstacleCollisionCount = 0;
    this.prizeCollisionCount = 0;

    this.salmonObstacles = [];
    this.heartPrizes = [];

    this.background = new Background(this);

    this.scoreBoard = new Scoreboard(this);
  }

  start() {
    this.loop();
    this.background.paint();
  }

  loop(timestamp) {
    this.runLogic();
    this.paint();

    if (this.timer < timestamp - this.speed) {
      this.timer = timestamp;
      const obstacle = new Obstacle(this, 0, 0);
      this.salmonObstacles.push(obstacle);
      // console.log('salmon is running');
      const prize = new Prize(this, 0, 0);
      this.heartPrizes.push(prize);
      // console.log('heart is running');
    }

    if (this.timer2 < timestamp - this.speedLevel) {
      this.timer2 = timestamp;
      this.speedLevel -= 2000;
    }

    this.character.runLogic();

    window.requestAnimationFrame(timestamp => this.loop(timestamp));
  }

  runLogic() {
    this.background.runLogic();

    //this controls the logic of each obstacle
    for (let i = 0; i < this.salmonObstacles.length; i++) {
      if (this.salmonObstacles[i].checkCollision()) {
        this.salmonObstacles.splice(i, 1);
        this.obstacleCollisionCount += 1;
        console.log(this.obstacleCollisionCount);
      }
      //The following code moved the obstacles
      this.salmonObstacles[i].runLogic();
    }

    // this controls the logic of each prize
    for (let i = 0; i < this.heartPrizes.length; i++) {
      if (this.heartPrizes[i].checkCollision()) {
        this.heartPrizes.splice(i, 1);
        this.prizeCollisionCount += 1;
        console.log(this.prizeCollisionCount);
      }
      this.heartPrizes[i].runLogic();
    }


  }

  clear() {
    const { width, height } = this.$canvas;
    this.context.clearRect(0, 0, width, height);
  }

  paint() {
    this.clear();
    this.background.paint();
    this.character.draw();

    for (let i = 0; i < this.salmonObstacles.length; i++) {
      this.salmonObstacles[i].draw();
    }
    for (let i = 0; i < this.heartPrizes.length; i++) {
      this.heartPrizes[i].draw();
    }

    this.scoreBoard.paint();
  }
}
