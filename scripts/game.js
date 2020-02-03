const BLOCK_SIZE = 45;

class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.$canvas.height = BLOCK_SIZE * 10;
    this.$canvas.width = BLOCK_SIZE * 20;

    this.character = new Character(this);
    this.character.setKeyboardEventListeners();

    this.timer = 0;
    this.speed = 1300;
    this.speedLevel = 3000;

    this.salmonObstacles = [];
    this.heartPrizes = [];

    this.context = this.$canvas.getContext('2d');

    this.background = new Background(this);
  }

  start() {
    this.loop();
  }

  loop(timestamp) {
    this.runLogic();
    this.paint();

    if (this.timer < timestamp - this.speed) {
      this.timer = timestamp;
      const obstacle = new Obstacle(this, 0, 0);
      this.salmonObstacles.push(obstacle);
      const prize = new Prize(this, 0, 0);
      this.heartPrizes.push(prize);
    }
  
    // if (this.timer2 < timestamp - this.speedLevel) {
    //   this.timer2 = timestamp;
    //   this.speedLevel -= 4000;
    // }
    
    window.requestAnimationFrame(timestamp => this.loop(timestamp));
  }

  runLogic() {
    //this controls the logic of each obstacle
    for (let i = 0; i < this.salmonObstacles.length; i++) {
      this.salmonObstacles[i].runLogic();

      // this controls the logic of each prize

      for (let i = 0; i < this.heartPrizes.length; i++) {
        this.heartPrizes[i].runLogic();
    }
  }
}

  clear() {
    const { width, height } = this.$canvas;
    this.context.clearRect(0, 0, width, height);
  }

  paint() {
    this.background.paint();
    this.character.draw();
    for (let i = 0; i < this.salmonObstacles.length; i++) {
      this.salmonObstacles[i].draw();
    for (let i = 0; i < this.heartPrizes.length; i++) {
        this.heartPrizes[i].draw();
    }
  }
}

};