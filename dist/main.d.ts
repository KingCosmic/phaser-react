// Type definitions for phaser3-react 1.0.17
// Project: phaser-react
// Definitions by: Austyn Studdard <https://github.com/KingCosmic>

import Plugin from '../src/plugin';

export { default as Renderer } from '../src/renderer'
export default Plugin;

/*~ On this line, import the module which this module adds to */
import * as phaser from 'phaser';
import { Component } from 'react';
import { ComponentManager } from '../src/manager';

/*~ Here, declare the same module as the one you imported above */
declare module 'phaser' {
  namespace GameObjects {
    interface GameObjectFactory {
      reactDom(component: Component, state: object): ComponentManager;
    }
  }
}