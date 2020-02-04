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
    this.speedLevel = 2000;

    this.obstacleCollisionCount = 0;
    this.prizeCollisionCount = 0;

    this.salmonObstacles = [];
    this.heartPrizes = [];

    this.background = new Background(this);

    this.scoreBoard = new Scoreboard(this);

    this.setControlBindings();
  }

  setControlBindings() {
    const $buttonStart = document.getElementById('btn-play');
    const $buttonPause = document.getElementById('btn-pause');
    const $buttonNewGame = document.getElementById('btn-newgame');

    $buttonStart.addEventListener('click', () => {
      this.start();
    });

    $buttonPause.addEventListener('click', () => {
      this.togglePause();
    });

    $buttonNewGame.addEventListener('click', () => {
      this.reset();
    });
  }

  runLogic(timestamp) {
    this.background.runLogic();
    this.character.runLogic();

    //This controls the time between each obstacle pushed to the salmon array
    if (this.timer < timestamp - this.speed) {
      this.timer = timestamp;
      const obstacle = new Obstacle(this, 0, 0);
      this.salmonObstacles.push(obstacle);
      // console.log('salmon is running');
      const prize = new Prize(this, 0, 0);
      this.heartPrizes.push(prize);
      // console.log('heart is running');
    }

    //This controls the speed of the game
    if (this.timer2 < timestamp - this.speedLevel) {
      this.timer2 = timestamp;
      this.speedLevel -= 2000;
    }

    //this controls the logic of each obstacle
    for (let i = 0; i < this.salmonObstacles.length; i++) {
      if (this.salmonObstacles[i].checkCollision()) {
        this.salmonObstacles.splice(i, 1);
        this.obstacleCollisionCount += 1;
      }
      //The following code moved the obstacles
      this.salmonObstacles[i].runLogic();
    }

    // this controls the logic of each prize
    for (let i = 0; i < this.heartPrizes.length; i++) {
      if (this.heartPrizes[i].checkCollision()) {
        this.heartPrizes.splice(i, 1);
        this.prizeCollisionCount += 1;
      }
      this.heartPrizes[i].runLogic();
    }

    if (this.obstacleCollisionCount >= 5) {
      this.lose();
    }

    if (this.character.positionY > this.$canvas.height) {
      this.lose();
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

  lose() {
    this.isRunning = !this.isRunning;
    ////CREATE GAME OVER SCREEN
  }

  togglePause() {
    this.isRunning = !this.isRunning;
  }

  start() {
    this.isRunning = true;
    this.loop();
  }

  reset() {
    this.character = new Character(this);
    this.background = new Background(this);
    this.scoreBoard = new Scoreboard(this);
    this.start();
  }

  loop(timestamp) {
    this.runLogic(timestamp);
    this.paint();

    if (this.isRunning) {
      window.requestAnimationFrame(timestamp => this.loop(timestamp));
    }
  }
}
