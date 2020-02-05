class Background {
  constructor(game) {
    this.game = game;
    this.positionX = 0;
    this.positionY = 0;
    this.width = this.game.context.canvas.width;
    this.height = this.game.context.canvas.height;
    this.speed = 2.5;

    this.backgroundImage = new Image();
    this.backgroundImage.src = './images/bg-pink.png';

    this.firstScreenImage = new Image();
    this.firstScreenImage.src = './images/screen1.png';

    window.addEventListener('load', () => {
      this.paintfirstScreen();
    });
  }

  paintfirstScreen() {
    context.drawImage(his.firstScreenImage, 0, 0, this.width, this.height);
  }

  paint() {
    const context = this.game.context;
    const $canvas = context.canvas;

    const width = $canvas.width;
    const height = $canvas.height;

    context.clearRect(0, 0, width, height);

    context.drawImage(this.backgroundImage, this.positionX, 0);
    if (this.speed < 0) {
      context(this.backgroundImage, this.positionX - width, 0);
    } else {
      context.drawImage(this.backgroundImage, this.positionX + this.width, 0);
    }
  }

  runLogic() {
    this.positionX -= this.speed;
    this.positionX %= $canvas.width;
  }
}
