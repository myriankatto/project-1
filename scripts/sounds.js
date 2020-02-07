class Sounds {
  constructor(game) {
    this.game = game;
    this.context = this.game.context;

  
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



}
