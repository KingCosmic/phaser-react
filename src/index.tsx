import { Plugins } from 'phaser';
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import Renderer from './renderer';

import manager from './manager';

class ReactUI extends Plugins.BasePlugin {
  constructor(pluginManager: Plugins.PluginManager) {
    super(pluginManager);

    //  Register our new Game Object type
    pluginManager.registerGameObject('reactDom', this.createReactDom);
  }

  init(data?: Object) {
    ReactDOM.render(
      <Renderer />,
      this.game.canvas
    );
  }

  createReactDom(component: ReactNode, props: Object) {
    return manager.addUI(component, props);
  }

}

export default ReactUI;