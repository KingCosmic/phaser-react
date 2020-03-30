import eventemitter from 'eventemitter3';

class ComponentManager {
  constructor(id) {
    this.events = new eventemitter();

    this.id = id;
    this.state = {};
  }

  setState(state) {
    this.state = { ...this.state, ...state };

    this.events.emit('state-change', this.state);
  }
}

class uiManager {
  constructor() {
    this.events = new eventemitter();

    this.lastID = 0;
  }

  addUI(component, props) {
    this.lastID++

    let manager = new ComponentManager(this.lastID);
    this.events.emit('ui-added', {
      manager,
      Component: component,
      props
    })

    return manager;
  }

  removeUI(id) {
    this.events.emit('ui-removed', id);
  }
}

export default new uiManager();