class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.$canvas.height = $canvas.height;
    this.$canvas.width = $canvas.width;
    this.context = this.$canvas.getContext('2d');
    this.isRunning = false;

    this.character = new Character(this);
    this.character.setKeyboardEventListeners();

    this.setControlBindings();
  }

  setControlBindings() {
    const $buttonNewGame = document.getElementById('btn-newgame');
    const $buttonPause = document.getElementById('btn-playpause');

    $buttonNewGame.addEventListener('click', () => {
      this.start();
    });

    $buttonPause.addEventListener('click', () => {
      this.togglePause();
      // if (this.isRunning) {
      //   let pauseImgSrc = document.getElementById('btn-pause').src;
      //   let srcPauseSubstring = pauseImgSrc.substring(0, pauseImgSrc.length - 13);
      //   document.getElementById('btn-pause').src = srcPauseSubstring + 'btn-play1.png';
      // } else if (!this.isRunning) {
      //   let playImgSrc = document.getElementById('btn-play1').src;
      //   let srcPlaySubstring = playImgSrc.substring(0, playImgSrc.length - 13);
      //   document.getElementById('btn-play1').src = srcPlaySubstring + 'btn-pause.png';
      // }
    });

    // $buttonNewGame.addEventListener('click', () => {
    //   this.reset();
    // });
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

    //if get 5 salmons --> game over
    //if get 3 salmons --> character gets heavier
    if (this.obstacleCollisionCount >= 5) {
      this.lose();
    } else if (this.obstacleCollisionCount >= 3) {
      this.character.gravity = 2;
    }

    if (this.prizeCollisionCount >= 10){
      alert('You won!')
      //CREATE WIN SCREEN
    }

    //if hit the bottom --> change Y direction
    if (this.character.positionY + this.character.height / 2 > this.$canvas.height) {
      this.character.positionY = -this.character.positionY;
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
    // this.character.storeLastPosition();

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
    alert('GAME OVER')
  }

  togglePause() {
    this.isRunning = !this.isRunning;
    this.loop();
  }

  start() {
    this.character = new Character(this);
    this.background = new Background(this);
    this.scoreBoard = new Scoreboard(this);

    this.obstacleCollisionCount = 0;
    this.prizeCollisionCount = 0;

    this.timer = 0;
    this.speed = 1000;
    this.speedLevel = 2000;

    this.salmonObstacles = [];
    this.heartPrizes = [];

    if (!this.isRunning) {
      this.isRunning = true;
      this.loop();
    }
  }

  loop(timestamp) {
    this.runLogic(timestamp);
    this.paint();

    if (this.isRunning) {
      window.requestAnimationFrame(timestamp => this.loop(timestamp));
    }
  }
}
