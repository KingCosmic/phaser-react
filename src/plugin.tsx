import { Plugins } from 'phaser';
import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import Renderer from './renderer';

import manager from './manager';

type PluginOptions = {
  // the parent element's id to render react dom into
  // if not set will wrap the game canvas with a div and render to that.
  parent: string;
  // if we shouldn't inject our own react dom
  // useful if you already have react
  dontInjectReact: boolean;
};

class ReactUI extends Plugins.BasePlugin {
  constructor(pluginManager: Plugins.PluginManager) {
    super(pluginManager);

    //  Register our new Game Object type
    pluginManager.registerGameObject('reactDom', this.createReactDom);
  }

  init(options?: PluginOptions) {
    // did they set a parent on the game config?
    let gameParent = this.game.config.parent;

    // don't inject react if the user wants to use this plugin in react.
    if (options.dontInjectReact) return;
    if (!options.parent && !gameParent) {
      let cont = document.createElement('div');
      document.body.appendChild(cont);

      cont.appendChild(this.game.canvas);
      let reactcont = cont.appendChild(document.createElement('div'));

      ReactDOM.render(<Renderer />, reactcont);
    } else {
      ReactDOM.render(<Renderer />, document.getElementById(options.parent || gameParent));
    }
  }

  createReactDom(component: ReactNode, props: Object) {
    return manager.addUI(component, props);
  }
}

export default ReactUI;