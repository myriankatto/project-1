const salmonImage = new Image();
salmonImage.src = './images/salmon.png';

class Obstacle {
  constructor(game, positionX, positionY) {
    this.game = game;
    this.positionX = this.game.$canvas.width;
    this.positionY = positionY;

    this.setRandomPosition();
  }

  setRandomPosition() {
    //this.positionX = Math.random() * 800;
    this.positionY = Math.random() * 420;
  }

  runLogic() {
    this.positionX -= 3;
  }

  draw() {
    this.game.context.save();
    this.game.context.drawImage(salmonImage, this.positionX, this.positionY, 30, 40);
    this.game.context.restore();
  }
}
