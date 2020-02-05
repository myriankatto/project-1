const salmonImage = new Image();
salmonImage.src = './images/salmon-sprite.png';

let salmonCounter = 0;
let salmon_frame_width = 300;
let salmon_frame_height = 225;

class Obstacle {
  constructor(game, positionY, prize) {
    this.game = game;
    this.positionX = this.game.$canvas.width;
    this.positionY = positionY;
    this.width = 45;
    this.height = 35;
    this.speed = 3;

    this.prize = prize;

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
    //   salmonImage,
    //   this.positionX,
    //   this.positionY,
    //   this.width,
    //   this.height
    // );
    // this.game.context.restore();
    let frame = Math.floor(salmonCounter % 4);
    this.game.context.drawImage(
      salmonImage,
      frame * salmon_frame_width,
      0,
      salmon_frame_width,
      salmon_frame_height,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
    salmonCounter = salmonCounter + 0.005;
  }

  checkCollision() {
    const characterPositionX = this.game.character.positionX + 10;
    const characterPositionY = this.game.character.positionY + 20;
    const characterWidth = this.game.character.width - 20;
    const characterHeight = this.game.character.height - 25;

    const obstaclePositionX = this.positionX;
    const obstaclePositionY = this.positionY;
    const obstacleWidth = this.width;
    const obstacleHeight = this.height;

    if (
      characterPositionX + characterWidth > obstaclePositionX &&
      characterPositionX < obstaclePositionX + obstacleWidth &&
      characterPositionY + characterHeight > obstaclePositionY &&
      characterPositionY < obstaclePositionY + obstacleHeight
    ) {
      // console.log('collision');
      return true;
    }
  }
}
