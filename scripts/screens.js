class Screen {
  constructor(game) {
    this.game = game;

    this.positionX = 0;
    this.positionY = 0;
    this.width = this.game.context.canvas.width;
    this.height = this.game.context.canvas.height;

    this.welcomeCounter = 0;
    this.welcomeframe_width = 74;
    this.welcomeframe_height = 84;

    this.welcomeScreen = new Image();
    this.welcomeScreen.src = './images/screen1.png';

    this.welcomecharacterImage = new Image();
    this.welcomecharacterImage.src = './images/welcoming-sprite.png';

    // this.instructionsScreen = new Image();
    // this.instructionsScreen.src = './images/screen2.png';

    this.youWinScreen = new Image();
    this.youWinScreen.src = './images/youwinscreen.png';

    this.gameOverScreen = new Image();
    this.gameOverScreen.src = './images/gameoverscreen.png';

    this.paintWelcomeScreen();
    // this.paintYouWinScreen();
    // this.runLogic();
    // this.paintGameOverScreen();
    // this.paintInstructionsScreen();
  }
  paintWelcomeScreen() {
    window.addEventListener('load', () => {
      this.game.context.drawImage(
        this.welcomeScreen,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );

      // let welcomeframe = Math.floor(this.welcomeCounter % 4);
      // this.game.context.drawImage(welcomecharacterImage, welcomeframe * this.welcomeframe_width,
      //   0,
      //   this.welcomeframe_width,
      //   this.welcomeframe_height,
      //   this.positionX,
      //   this.positionY,
      //   this.width,
      //   this.height
      // );
      // this.welcomeCounter = this.welcomeCounter + 0.1;
    });
  }

  // paintInstructionsScreen() {
  //   context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);

  //   this.context.$canvas.drawImage(
  //     this.instructionsScreen,
  //     0,
  //     0,
  //     this.$canvas.width,
  //     this.$canvas.height
  //   );
  // }

  paintGameOverScreen() {
    // this.game.context.clearRect(this.positionX, this.positionX, this.width, this.height);
    this.game.context.fillRect(100, 100, 100, 100);
    
    this.game.context.drawImage(
      this.gameOverScreen,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
    console.log('you lost');
  }

  paintYouWinScreen() {
    this.game.context.drawImage(
      this.youWinScreen,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );

    console.log('you win!');
  }

  // runLogic() {
  //   window.addEventListener('keydown', event => {
  //     switch (event.keyCode) {
  //       case 13:
  //         this.paintInstructionsScreen();
  //         console.log('press enter');
  //         break;
  //     }
  //   });
  // }
}
