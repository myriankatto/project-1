class Scoreboard {
  constructor(game) {
    this.game = game;

    this.$salmonScoreSpan = document.querySelector('div h1 span');
    this.$heartScoreSpan = document.querySelector('div h2 span');

  }

  paint() {
    const salmonsScore = this.game.obstacleCollisionCount;
    this.$salmonScoreSpan.innerText = salmonsScore;

    const heartScore = this.game.prizeCollisionCount;
    this.$heartScoreSpan.innerText = heartScore;
  }
}
