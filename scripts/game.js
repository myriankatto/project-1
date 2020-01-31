
class Game {
  constructor ($canvas) {
    this.$canvas = $canvas;
    // this.$canvas.height = BLOCK_SIZE * 12;
    // this.$canvas.width = BLOCK_SIZE * 24;

    this.context = this.$canvas.getContext('2d');

    this.background = new Background(this);
  }

  start () {
    this.character = new Character(this);
    this.loop();
  }


  loop () {
    this.runLogic();
    this.paint();
    window.requestAnimationFrame(timestamp => this.loop(timestamp));
  }

  runLogic () {
    // this.character.runLogic();
  }

  clear () {
    const { width, height } = this.$canvas;
    this.context.clearRect(0, 0, width, height);
  }
  paint () {
    this.background.paint();
    this.character.draw();
  }
}