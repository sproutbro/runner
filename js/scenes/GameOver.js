export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "gameover" });
  }

  async create() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;

    this.cameras.main.setBackgroundColor(0x87ceeb);

    const score = this.registry.get("score");
    const data = await this.postScore(score);
    console.log(data);

    this.add
      .bitmapText(
        this.center_width,
        50,
        "arcade",
        score,
        25
      )
      .setOrigin(0.5);
    this.add
      .bitmapText(
        this.center_width,
        this.center_height,
        "arcade",
        "GAME OVER",
        45
      )
      .setOrigin(0.5);
    this.add
      .bitmapText(
        this.center_width,
        250,
        "arcade",
        "Press SPACE or Click to restart!",
        15
      )
      .setOrigin(0.5);

    this.input.keyboard.on("keydown-SPACE", this.startGame, this);
    this.input.on("pointerdown", (pointer) => this.startGame(), this);
  }

  async postScore(score) {
    try {
      const response = await fetch("/api/scores", {
        method: 'POST',
        body: JSON.stringify({ score }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  showLine(text, y) {
    let line = this.introLayer.add(
      this.add
        .bitmapText(this.center_width, y, "pixelFont", text, 25)
        .setOrigin(0.5)
        .setAlpha(0)
    );
    this.tweens.add({
      targets: line,
      duration: 2000,
      alpha: 1,
    });
  }

  startGame() {
    this.scene.start("game");
  }
}
