const backgroundImage = new Image();
backgroundImage.src = './images/background.png';

class Background {
  constructor (game){
    this.game = game;
  }

  paint(){
    const context = this.game.context;
    const $canvas = context.canvas;
    
    const width = $canvas.width;
    const height = $canvas.height;
    // const distance = this.game.player.position.x;
        
    backgroundImage.addEventListener('load', () => {
      context.drawImage(backgroundImage, 0, 0, width, height);
    });
  }  

};  




