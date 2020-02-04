class Scoreboard {
  constructor(game) {
    this.game = game;

    this.$salmonScoreSpan = document.getElementById('salmon-score');
    this.$heartScoreSpan = document.getElementById('heart-score');

  }

  paint() {
    const salmonsScore = this.game.obstacleCollisionCount;
    this.$salmonScoreSpan.innerText = salmonsScore;

    const heartScore = this.game.prizeCollisionCount;
    this.$heartScoreSpan.innerText = heartScore;
  }
}
