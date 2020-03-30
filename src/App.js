import React, { useEffect } from 'react';
import * as Phaser from 'phaser';

import UIRenderer from './uiRenderer';

import gameConfig from './gameConfig';

function App() {
  useEffect(() => {
    new Phaser.Game(gameConfig)
  })

  return (
    <div id='phaserContainer' style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <UIRenderer />
    </div>
  );
}

export default App;
