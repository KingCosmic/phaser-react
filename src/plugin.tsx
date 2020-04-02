import { Plugins } from 'phaser';
import React, { Component } from 'react';
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

const defaultOptions: PluginOptions = {
  parent: '',
  dontInjectReact: false
}

class ReactUI extends Plugins.BasePlugin {
  constructor(pluginManager: Plugins.PluginManager) {
    super(pluginManager);

    //  Register our new Game Object type
    pluginManager.registerGameObject('reactDom', this.createReactDom);
  }

  init(options: PluginOptions = defaultOptions) {
    // did they set a parent on the game config? (idk why but config was null when i tried developing this)
    let gameParent = this.game.config ? this.game.config.parent : null;

    options.parent = options.parent || gameParent;

    // don't inject react incase the user wants to use this plugin inside a react project.
    if (options.dontInjectReact) return;
    if (!options.parent) {
      let cont = document.createElement('div');
      let reactcont = document.createElement('div');
      document.body.appendChild(cont);

      cont.appendChild(this.game.canvas);
      cont.appendChild(reactcont);

      ReactDOM.render(<Renderer />, reactcont);
    } else {

      ReactDOM.render(<Renderer />, document.getElementById(options.parent));
    }
  }

  createReactDom(component: Component, props: Object) {
    return manager.addUI(component, props);
  }
}

export default ReactUI;