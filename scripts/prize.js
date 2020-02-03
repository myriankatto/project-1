const heartImage = new Image();
heartImage.src = './images/heart.png';

class Prize {
  constructor(game, positionY) {
    this.game = game;
    this.positionX = this.game.$canvas.width;
    this.positionY = positionY;

    this.setRandomPosition();
  }

  setRandomPosition() {
    this.positionY = Math.random() * 420;
  }

  runLogic() {
    this.positionX -= 3;
  }

  draw() {
    this.game.context.save();
    this.game.context.drawImage(heartImage, this.positionX, this.positionY, 20, 20);
    this.game.context.restore();
  }
}
