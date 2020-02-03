const characterImage = new Image();
characterImage.src = './images/wasabi-stand.png';

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
        // case 37:
        //   this.positionX -= 10;
        //   break;
        // case 39:
        //   this.positionX += 10;
        //   break;
        case 32:
          this.positionY -= 20;
          break;
        // case 40:
        //   this.positionY += 10;
        //   break;
      }
    });
  }

  runLogic() {
    this.positionY += this.gravity;
  }

  draw() {
    this.game.context.save();
    // ---- COLLITION DEBUGGIN RECTANGLE
    // this.game.context.fillRect(this.width, this.height, this.positionX, this.positionY);
    // this.game.context.fillRect(
    //   this.positionX +10,
    //   this.positionY + 20,
    //   this.width - 20,
    //   this.height - 25
    // );

    this.game.context.drawImage(
      characterImage,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
    this.game.context.restore();
  }
}
