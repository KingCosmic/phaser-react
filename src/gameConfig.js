import { AUTO } from 'phaser';

import gameScene from './scenes/game';

import ReactUI from './plugins/reactUI';

export default {
  type: AUTO,
  width: 800,
  height: 600,
  parent: 'phaserContainer',
  scene: [
    gameScene
  ],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300
      },
      debug: false
    }
  },
  plugins: {
    global: [{
      key: 'ReactUI',
      plugin: ReactUI,
      start: true
    }]
  }
};