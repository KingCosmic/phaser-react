import React, { Component } from 'react';

import Wrapper from './wrapper';

import manager, { ComponentManager } from './manager';

type Comp = {
  Component: Component,
  props: Object,
  manager: ComponentManager
  mainManager: typeof manager;
}

type Props = {

}

type State = {
  components: Array<Comp>
}

class Renderer extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      components: []
    }

    this.addComponent = this.addComponent.bind(this);
  }

  componentDidMount() {
    manager.events.on('component-added', this.addComponent, this);
    manager.events.on('component-removed', this.removeComponent, this);
  }

  addComponent(component: Comp) {
    this.setState({
      components: [component, ...this.state.components]
    })
  }

  removeComponent(id: number) {
    this.setState({
      components: this.state.components.filter((Comp) => Comp.manager.id !== id)
    })
  }

  render() {
    let { components } = this.state;

    return (
      <>
        {
          components.map(({ Component, props, manager, mainManager }) => {
            return <Wrapper key={manager.id} Comp={Component} extraProps={props} manager={manager} mainManager={mainManager} />
          })
        }
      </>
    )
  }
}

export default Renderer;