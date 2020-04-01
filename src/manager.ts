import eventemitter from 'eventemitter3';
import { ReactNode } from 'react';

export class ComponentManager {
  events: eventemitter;
  id: number;
  state: Object;

  constructor(id: number) {
    this.events = new eventemitter();

    this.id = id;
    this.state = {};
  }

  setState(state: Object) {
    this.state = { ...this.state, ...state };

    this.events.emit('state-change', this.state);
  }
}

class manager {
  events: eventemitter;
  lastID: number;

  constructor() {
    this.events = new eventemitter();

    this.lastID = 0;
  }

  addUI(component: ReactNode, props: Object): ComponentManager {
    this.lastID++

    let manager = new ComponentManager(this.lastID);
    this.events.emit('ui-added', {
      manager,
      Component: component,
      props
    })

    return manager;
  }

  removeUI(id: number) {
    this.events.emit('ui-removed', id);
  }
}

export default new manager();