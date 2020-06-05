import { Plugins } from 'phaser';
import React, { ElementType } from 'react';
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

    // don't inject react incase the user wants to use this plugin inside a react project.
    if (options.dontInjectReact) return;

    const container = this.game.domContainer

    if (!container) return console.error('this plugins requires you have `dom: { createContainer: true }` in your game config')

    ReactDOM.render(<Renderer />, container);
  }

  createReactDom(component: ElementType<any>, props: Object) {
    return manager.addComponent(component, props);
  }
}

export default ReactUI;