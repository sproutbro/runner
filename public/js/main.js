// import Phaser from "phaser";
import Game from "./scenes/Game.js";
import GameOver from "./scenes/GameOver.js";
/*
This is the main configuration file for the game.
*/
const config = {
  width: 600,
  height: 300,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  autoRound: false,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 350 },
      debug: false,
    },
  },
  scene: [Game, GameOver],
};

const game = new Phaser.Game(config);
