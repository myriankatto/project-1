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

    this.screen = new Screen(this);
    this.instructionsScreen = new Image();
    this.instructionsScreen.src = './images/instructions.png';

    this.wasabiScreen = new Image();
    this.wasabiScreen.src = './images/wasabi-screen.png';

    this.myAudio = document.createElement('audio');
    this.myAudio.src = './audio/audio.wav';

    this.prizeAudio = document.createElement('audio');
    this.prizeAudio.src = './audio/prize.wav';

    this.obstacleAudio = document.createElement('audio');
    this.obstacleAudio.src = './audio/obstacle.wav';

    this.gameOverAudio = document.createElement('audio');
    this.gameOverAudio.src = './audio/gameover.wav';

    this.winAudio = document.createElement('audio');
    this.winAudio.src = './audio/win.wav';
  }



  playWinAudio() {
    this.winAudio.play();
  }

  playGameOverAudio() {
    this.gameOverAudio.play();
  }

  playPrizeAudio() {
    this.prizeAudio.play();
  }

  playObstacleAudio() {
    this.obstacleAudio.play();
  }

  playMusic() {
    this.myAudio.play();
    this.myAudio.loop = true;
  }

  pauseMusic(audio) {
    this.myAudio.pause();
  }

  setControlBindings() {
    const $buttonNewGame = document.getElementById('btn-newgame');
    const $buttonPause = document.getElementById('btn-playpause');
    const $buttonInstructions = document.getElementById('btn-instructions');
    const $wasabiInstructions = document.getElementById('btn-wasabi');

    $buttonInstructions.addEventListener('click', () => {
      this.context.drawImage(
        this.instructionsScreen,
        0,
        0,
        this.$canvas.width,
        this.$canvas.height
      );
    });

    $wasabiInstructions.addEventListener('click', () => {
      this.context.drawImage(this.wasabiScreen, 0, 0, this.$canvas.width, this.$canvas.height);
    });

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
        this.playObstacleAudio();
        this.salmonObstacles.splice(i, 1);
        this.obstacleCollisionCount -= 1;
      }
      //The following code moved the obstacles
      this.salmonObstacles[i].runLogic();
    }

    // this controls the logic of each prize
    for (let i = 0; i < this.heartPrizes.length; i++) {
      if (this.heartPrizes[i].checkCollision()) {
        this.playPrizeAudio();
        this.heartPrizes.splice(i, 1);
        this.prizeCollisionCount += 1;
      }
      this.heartPrizes[i].runLogic();
    }

    //if get 5 salmons --> game over
    //character gets heavier when gets salmons
    if (this.obstacleCollisionCount <= 0) {
      this.lose();
    } else if (this.obstacleCollisionCount <= 4) {
      this.character.gravity = 2;
    } else if (this.obstacleCollisionCount <= 3) {
      this.character.gravity = 3;
    } else if (this.obstacleCollisionCount <= 2) {
      this.character.gravity = 4;
    }

    if (this.prizeCollisionCount >= 10) {
      this.win();
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
    this.playGameOverAudio();
    this.pauseMusic();
    this.clear();
    this.screen.paintGameOverScreen();
  }

  win() {
    this.isRunning = !this.isRunning;
    this.pauseMusic();
    this.playWinAudio();
    this.clear();
    this.screen.paintYouWinScreen();
  }

  togglePause() {
    this.isRunning = !this.isRunning;
    this.pauseMusic();
    this.loop();
  }

  start() {
    this.character = new Character(this);
    this.background = new Background(this);
    this.scoreBoard = new Scoreboard(this);
    this.obstacleCollisionCount = 5;
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

    if (this.isRunning) {
      this.paint();
      this.playMusic();
      window.requestAnimationFrame(timestamp => this.loop(timestamp));
    }
  }
}
