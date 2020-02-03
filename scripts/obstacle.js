const salmonImage = new Image();
salmonImage.src = './images/salmon.png';

class Obstacle {
  constructor(game, positionY) {
    this.game = game;
    this.positionX = this.game.$canvas.width;
    this.positionY = positionY;
    this.width = 30;
    this.height = 40;
    this.speed = 3;

    this.setRandomPosition();
  }

  setRandomPosition() {
    this.positionY = Math.random() * 420;
  }

  runLogic() {
    this.positionX -= this.speed;
    // this.checkCollision();
  }

  draw() {
    this.game.context.save();
    this.game.context.drawImage(
      salmonImage,
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
      console.log('collision');
      return true;
    }
  }
}

// class Scoreboard {
//   constructor (obstacle) {
//     this.obstacle = obstacle;

//     this.$scoreSpan = document.querySelector('h1 span');
//   }

//   paint () {
//     this.$scoreSpan.innerText = collisionCount;
//   }
// }
