const characterImage = new Image();
characterImage.src = './images/wasabi-stand.png';

class Character {
  constructor(game) {
    this.game = game;
    this.positionX = 0;
    this.positionY = 0;
    this.width = BLOCK_SIZE;
    this.height = BLOCK_SIZE * 2;

    this.velocity = {
      x: 0,
      y: 2
    };

    this.gravity = 10;
    this.friction = 15;

    this.setKeyboardEventListeners();
  }

  setKeyboardEventListeners() {
    window.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 37:
          this.positionX -= 10;
          // console.log('Going left', this.positionX);
          break;
        case 39:
          this.positionX += 10;
          // console.log('Going right');
          break;
        case 38:
          this.positionY -= 10;
          this.gravity;
          // console.log('Going up');
          break;
        case 40:
          this.positionY += 10;
          // console.log('Going Down');
          break;
      }
    });
  }

  jump() {
    if (!this.jumping) {
      this.velocity.y = -5;
      this.jumping = true;
    }
  }

  runLogic() {
    const { position, dimensions, velocity, gravity, friction } = this;
    let newVelocity = {
      x: velocity.x / (1 + (friction / 1000) * 16) + runningDirection * 0.5,
      y: velocity.y + (gravity / 1000) * 16
    };
    let newPosition = {
      x: position.x + newVelocity.x,
      y: position.y + newVelocity.y
    };

    Object.assign(this.velocity, newVelocity);
    Object.assign(this.position, newPosition);
  }

  draw() {
    this.game.context.save();

    this.game.context.drawImage(characterImage, this.positionX, this.positionY);

    this.game.context.restore();
  }
}
