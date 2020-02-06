const characterImage = new Image();
characterImage.src = './images/wasabi-sprite.png';

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

    this.gravity = 1.1;

    this.counter = 0;
    this.frame_width = 114;
    this.frame_height = 88;

    // this.motionTrailLength = 60;
    // this.positions = [];

    this.setKeyboardEventListeners();
  }

  setKeyboardEventListeners() {
    window.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 32:
          if (this.positionY < 0) {
            this.positionY = -this.positionY;
          } else {
            this.positionY -= 50;
            break;
          }
      }
    });
  }

  runLogic() {
    this.positionY += this.gravity;
  }

  draw() {
    // for (var i = 0; i < this.positions.length; i++) {
    //   this.game.context.drawImage(characterTrailImage, this.positions[i].x , this.positions[i].y + 75, this.width, 40);

    // }
    // this.storeLastPosition(this.positionX, this.positionY);

    let frame = Math.floor(this.counter % 4);
    this.game.context.drawImage(
      characterImage,
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
