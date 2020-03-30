import { Plugins } from 'phaser';

import uiManager from '../state/ui';

class ReactUI extends Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    //  Register our new Game Object type
    pluginManager.registerGameObject('reactDom', this.createReactDom);
  }

  createReactDom(component, props) {
    return uiManager.addUI(component, props);
  }

}

export default ReactUI;