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

  init(options: PluginOptions) {
    options = { ...defaultOptions, ...options }
    // did they set a parent on the game config?
    let gameParent = this.game.config.parent;

    // don't inject react incase the user wants to use this plugin inside a react project.
    if (options.dontInjectReact) return;
    if (!options.parent) {
      let cont = document.createElement('div');
      let reactcont = document.createElement('div');
      document.body.appendChild(cont);

      cont.appendChild(this.game.canvas);
      cont.appendChild(reactcont);
      cont.style.position = 'relative'
      reactcont.style.position = 'absolute';
      reactcont.style.top = '0'
      reactcont.style.left = '0'
      reactcont.style.width = '100%'
      reactcont.style.height = '100%'

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