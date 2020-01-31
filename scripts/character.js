


const characterImage = new Image();
characterImage.src = './images/wasabi-stand.png';



class Character {
  constructor (game) {
    this.game = game;
  }

  runLogic () {
    
  }

  draw () {
    const context = this.game.context;
    const $canvas = context.canvas;
    // const {
    //   position: { x: distance, y },
    //   dimensions: { x: width, y: height }
    // } = this;
    // const x = ($canvas.width + width) / 2;

    context.save();

    // context.translate(x, y);

    context.drawImage(characterImage, 80, 70, 78, 56)

    context.restore();
  }
}



