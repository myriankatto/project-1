const heartImage = new Image();
heartImage.src = './images/heart-sprite.png';

let heartCounter = 0;
let heart_frame_width = 35;
let heart_frame_height = 35;

class Prize {
  constructor(game, positionY) {
    this.game = game;
    this.positionX = this.game.$canvas.width + 100;
    this.positionY = positionY;
    this.width = 20;
    this.height = 20;
    this.speed = 4;

    this.setRandomPosition();
  }

  setRandomPosition() {
    this.positionY = Math.random() * 420;
  }

  runLogic() {
    this.positionX -= this.speed;
  }

  draw() {
    // this.game.context.save();
    // this.game.context.drawImage(
    //   heartImage,
    //   this.positionX,
    //   this.positionY,
    //   this.width,
    //   this.height
    // );
    // this.game.context.restore();
    let frame = Math.floor(heartCounter % 2);
    this.game.context.drawImage(
      heartImage,
      frame * heart_frame_width,
      0,
      heart_frame_width,
      heart_frame_height,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
    heartCounter = heartCounter + 0.5;
  }

  checkCollision() {
    const characterPositionX = this.game.character.positionX + 10;
    const characterPositionY = this.game.character.positionY + 20;
    const characterWidth = this.game.character.width - 25;
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
