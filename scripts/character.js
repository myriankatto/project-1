const characterImage = new Image();
characterImage.src = './images/wasabi-sprite.png';

let counter = 0;
let frame_width = 114;
let frame_height = 88;

class Character {
  constructor(game) {
    this.game = game;

    this.positionX = 300;
    this.positionY = 40;
    this.width = 92;
    this.height = 73;

    this.gravity = 1.2;

    this.setKeyboardEventListeners();
  }

  setKeyboardEventListeners() {
    window.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 32:
          if (this.positionY < 0) {
            this.positionY = -this.positionY;
            // } else if (this.positionY + this.height > 471) {
            //   console.log('game over');
          } else {
            this.positionY -= 20;
            break;
          }
      }
    });
  }

  runLogic() {
    this.positionY += this.gravity;
  }

  draw() {
    // this.game.context.save();
    // ---- COLLITION DEBUGGIN RECTANGLE
    // this.game.context.fillRect(this.width, this.height, this.positionX, this.positionY);
    // this.game.context.fillRect(
    //   this.positionX +10,
    //   this.positionY + 20,
    //   this.width - 20,
    //   this.height - 25
    // );

    // this.game.context.drawImage(
    //   characterImage,
    //   this.positionX,
    //   this.positionY,
    //   this.width,
    //   this.height
    // );


    let frame = Math.floor(counter % 4);
    this.game.context.drawImage(
      characterImage,
      frame * frame_width,
      0,
      frame_width,
      frame_height,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
    counter = counter + 0.1;
    // this.game.context.restore();
  }


}
