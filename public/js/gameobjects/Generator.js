export default class Generator {
  constructor(scene) {
    this.scene = scene;
    this.scene.time.delayedCall(2000, () => this.init(), null, this);
    this.pinos = 0;
  }

  init() {
    this.generateCloud();
    this.generateObstacle();
    this.generateCoin();
  }

  generateCloud() {
    new Cloud(this.scene);
    this.scene.time.delayedCall(
      Phaser.Math.Between(2000, 3000),
      () => this.generateCloud(),
      null,
      this
    );
  }

  generateObstacle() {
    this.scene.obstacles.add(
      new Obstacle(
        this.scene,
        800,
        this.scene.height - Phaser.Math.Between(32, 128)
      )
    );
    this.scene.time.delayedCall(
      Phaser.Math.Between(1500, 2500),
      () => this.generateObstacle(),
      null,
      this
    );
  }

  generateCoin() {
    this.scene.coins.add(
      new Coin(
        this.scene,
        800,
        this.scene.height - Phaser.Math.Between(32, 128)
      )
    );
    this.scene.time.delayedCall(
      Phaser.Math.Between(500, 1500),
      () => this.generateCoin(1),
      null,
      this
    );
  }
}

class Cloud extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    const finalY = y || Phaser.Math.Between(0, 100);
    super(scene, x, finalY, 98, 32, 0xffffff);
    scene.add.existing(this);
    const alpha = 1 / Phaser.Math.Between(1, 3);

    this.setScale(alpha);
    this.init();
  }

  init() {
    this.scene.tweens.add({
      targets: this,
      x: { from: 800, to: -100 },
      duration: 2000 / this.scale,
      onComplete: () => {
        this.destroy();
      },
    });
  }
}

class Obstacle extends Phaser.GameObjects.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "pino");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    const alpha = 1 / Phaser.Math.Between(1, 3);

    this.init();
  }

  init() {
    this.scene.tweens.add({
      targets: this,
      x: { from: 820, to: -100 },
      duration: 2000,
      onComplete: () => {
        this.destroy();
      },
    });
  }
}

class Coin extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "coin");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    const alpha = 1 / Phaser.Math.Between(1, 3);

    this.init();
  }

  init() {
    this.scene.tweens.add({
      targets: this,
      x: { from: 820, to: -100 },
      duration: 2000,
      onComplete: () => {
        this.destroy();
      },
    });

    const coinAnimation = this.scene.anims.create({
      key: "coin",
      frames: this.scene.anims.generateFrameNumbers("coin", {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
    });
    this.play({ key: "coin", repeat: -1 });
  }
}
