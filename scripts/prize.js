const heartImage = new Image();
heartImage.src = './images/heart.png';

class Prize {
  constructor(game, positionY) {
    this.game = game;
    this.positionX = this.game.$canvas.width + 100;
    this.positionY = positionY;
    this.width = 20;
    this.height = 20;
    this.speed = 3;

    this.setRandomPosition();
  }

  setRandomPosition() {
    this.positionY = Math.random() * 420;
  }

  runLogic() {
    this.positionX -= this.speed;
  }

  draw() {
    this.game.context.save();
    this.game.context.drawImage(
      heartImage,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
    this.game.context.restore();
  }

  checkCollision() {
    const characterPositionX = this.game.character.positionX + 10;
    const characterPositionY = this.game.character.positionY + 20;
    const characterWidth = this.game.character.width - 20;
    const characterHeight = this.game.character.height - 25;

    const prizePositionX = this.positionX;
    const prizePositionY = this.positionY;
    const prizeWidth = this.width;
    const prizeHeight = this.height;

    if (
      characterPositionX + characterWidth > prizePositionX &&
      characterPositionX < prizePositionX + prizeWidth &&
      characterPositionY + characterHeight > prizePositionY &&
      characterPositionY < prizePositionY + prizeHeight
    ) {
      // console.log('collision');
      return true;
    }
  }
}
