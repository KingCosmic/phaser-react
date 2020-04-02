import eventemitter from 'eventemitter3';
import { Component } from 'react';

export class ComponentManager {
  events: eventemitter;
  mainManager: manager;
  id: number;
  state: Object;

  constructor(id: number, mainManager: manager) {
    this.events = new eventemitter();

    this.id = id;
    this.mainManager = mainManager;
    this.state = {};
  }

  setState(state: Object) {
    this.state = { ...this.state, ...state };

    this.events.emit('state-change', this.state);
  }

  destroy() {
    this.mainManager.removeComponent(this.id);
  }
}

class manager {
  events: eventemitter;
  lastID: number;

  constructor() {
    this.events = new eventemitter();

    this.lastID = 0;
  }

  addComponent(component: Component, props: Object): ComponentManager {
    this.lastID++

    let manager = new ComponentManager(this.lastID, this);
    this.events.emit('component-added', {
      mainManager: this,
      Component: component,
      manager,
      props
    })

    return manager;
  }

  removeComponent(id: number) {
    this.events.emit('component-removed', id);
  }
}

export default new manager();