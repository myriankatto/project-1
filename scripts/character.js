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

    this.gravity = 1.3;

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
  }
}
