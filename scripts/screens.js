let welcomeCounter = 0;
let welcomeframe_width = 74;
let welcomeframe_height = 84;

class Screen {
  constructor(game) {
    this.game = game;
    this.context = this.game.context;

    this.positionX = 0;
    this.positionY = 0;
    this.width = this.game.context.canvas.width;
    this.height = this.game.context.canvas.height;

    this.welcomeScreen = new Image();
    this.welcomeScreen.src = './images/screen1.png';

    // this.instructionsScreen = new Image();
    // this.instructionsScreen.src = './images/screen2.png';

    this.paintWelcomeScreen();
    // this.runLogic();
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

      // this.paintWasabiWelcoming();
    });
  }

  // paintWasabiWelcoming() {
  //   this.welcomecharacterImage = new Image();
  //   this.welcomecharacterImage.src = './images/welcoming-sprite.png';

  //   this.welcomecharacterImage.addEventListener('load', () => {
  //     let welcomeframe = Math.floor(welcomeCounter % 3);
  //     this.game.context.drawImage(
  //       this.welcomecharacterImage,
  //       welcomeframe * welcomeframe_width,
  //       0,
  //       welcomeframe_width,
  //       welcomeframe_height,
  //       this.width / 2 - welcomeframe_width + 37,
  //       150,
  //       74,
  //       84
  //     );
  //     welcomeCounter = welcomeCounter + 0.2;

  //   });
  // }

  paintGameOverScreen() {
    this.gameOverScreen = new Image();
    this.gameOverScreen.src = './images/gameoverscreen.png';

    this.gameOverScreen.addEventListener('load', () => {
      this.game.context.drawImage(
        this.gameOverScreen,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
    });
  }

  paintYouWinScreen() {
    this.youWinScreen = new Image();
    this.youWinScreen.src = './images/youwinscreen.png';

    this.youWinScreen.addEventListener('load', () => {
      this.game.context.drawImage(
        this.youWinScreen,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
    });
  }
}
