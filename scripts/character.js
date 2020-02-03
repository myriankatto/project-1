const characterImage = new Image();
characterImage.src = './images/wasabi-stand.png';

class Character {
  constructor(game) {
    this.game = game;

    this.positionX = 0;
    this.positionY = 0;
    this.width = 112;
    this.height = 88;

    this.setKeyboardEventListeners();
  }

  setKeyboardEventListeners() {
    window.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 37:
          this.positionX -= 10;
          break;
        case 39:
          this.positionX += 10;
          break;
        case 38:
          this.positionY -= 10;
          break;
        case 40:
          this.positionY += 10;
          break;
      }
    });
  }

  runLogic() {}

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
