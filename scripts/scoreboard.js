const heartScoreImage = new Image();
heartScoreImage.src = './images/heart-score.png';

const salmonScoreImage = new Image();
salmonScoreImage.src = './images/salmon-score.png';

class Scoreboard {
  constructor(game) {
    this.game = game;

    this.$salmonScoreSpan = document.getElementById('salmon-score');
    this.$heartScoreSpan = document.getElementById('heart-score');
  }

  paint() {
    this.game.context.drawImage(heartScoreImage, 520, 0);
    this.game.context.drawImage(salmonScoreImage, 630, 0);

    const heartScore = this.game.prizeCollisionCount;
    
    this.game.context.font = '23px VT323';
    this.game.context.fillStyle = 'rgb(46, 1, 58)';
    this.game.context.fillText(heartScore + '/10', 572, 36);
  
    
    const salmonsScore = this.game.obstacleCollisionCount;

    this.game.context.font = '23px VT323';
    this.game.context.fillStyle= ' rgb(46, 1, 58)';
    this.game.context.fillText(salmonsScore + '/5', 686, 36);

  }
}
