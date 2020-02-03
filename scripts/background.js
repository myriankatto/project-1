const backgroundImage = new Image();
backgroundImage.src = './images/background1.jpg';

class Background {
  constructor(game) {
    this.game = game;
  }

  paint() {
    const context = this.game.context;
    const $canvas = context.canvas;

    const width = $canvas.width;
    const height = $canvas.height;

    context.save();
    context.drawImage(backgroundImage, 0, 0, width, height);

    context.restore();
  }
}
