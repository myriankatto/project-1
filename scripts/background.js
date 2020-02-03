const backgroundImage = new Image();
backgroundImage.src = './images/bg-big.png';

class Background {
  constructor(game) {
    this.game = game;
    this.positionX = 0;
    this.positionY = 0;
    this.width = backgroundImage.width;
    this.height = backgroundImage.height;
  }

  paint() {
    const context = this.game.context;
    const $canvas = context.canvas;

    const width = $canvas.width;
    const height = $canvas.height;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    context.drawImage(backgroundImage, this.positionX--, 0);

    // context.drawImage(backgroundImage, 0 , 0);
  }

  runLogic() {
    if (this.positionX <= 749) {
      this.positionX = 0;
    }
  }
}
