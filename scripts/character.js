// const characterTrailImage = new Image();
// characterTrailImage.src = './images/trail.png';

class Character {
  constructor(game, background) {
    this.game = game;
    this.background = background;

    this.positionX = 300;
    this.positionY = 40;
    this.width = 92;
    this.height = 73;

    this.gravity = 1.2;
    this.speed = 1;

    this.counter = 0;
    this.frame_width = 114;
    this.frame_height = 88;

    this.characterImage = new Image();
    this.characterImage.src = './images/wasabi-sprite.png';
    this.characterImage2 = new Image();
    this.characterImage2.src = './images/wasabi-voando-fat-sprite.png';
    // this.motionTrailLength = 60;
    // this.positions = [];

    this.jumpAudio = document.createElement('audio');
    this.jumpAudio.src = './audio/jump.wav';

    this.setKeyboardEventListeners();
  }

  playJumpAudio() {
    this.jumpAudio.play();
  }

  setKeyboardEventListeners() {
    window.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 32:
          if (this.positionY - 20 < 0) {
            this.positionY = -this.positionY;
            this.playJumpAudio();
          } else {
            this.positionY -= 50;
            break;
          }
      }
    });
  }

  runLogic() {
    this.positionY += this.gravity * this.speed;
  }

  draw() {
    // for (var i = 0; i < this.positions.length; i++) {
    //   this.game.context.drawImage(characterTrailImage, this.positions[i].x , this.positions[i].y + 75, this.width, 40);

    // }
    // this.storeLastPosition(this.positionX, this.positionY);
    if (this.game.obstacleCollisionCount <= 3) {
      let frame = Math.floor(this.counter % 4);
      this.game.context.drawImage(
        this.characterImage2,
        frame * this.frame_width,
        0,
        this.frame_width,
        this.frame_height,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
      this.counter = this.counter + 0.1;
    } else {
      let frame = Math.floor(this.counter % 4);
      this.game.context.drawImage(
        this.characterImage,
        frame * this.frame_width,
        0,
        this.frame_width,
        this.frame_height,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
      this.counter = this.counter + 0.1;
    }
  }

  // storeLastPosition() {
  //   // push an item
  //   this.positions.push({
  //     x: this.positionX,
  //     y: this.positionY
  //   });

  //   //get rid of first item
  //   if (this.positions.length > this.motionTrailLength) {
  //     this.positions.shift();
  //   }
  // }
}
