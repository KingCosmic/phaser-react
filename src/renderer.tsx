import React, { Component } from 'react';

import Wrapper from './wrapper';

import manager, { ComponentManager } from './manager';

type Comp = {
  Component: Component,
  props: Object,
  manager: ComponentManager
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
    manager.events.on('ui-added', this.addComponent, this);
  }

  addComponent(ui: Comp) {
    this.setState({
      components: [ui, ...this.state.components]
    })
  }

  render() {
    let { components } = this.state;

    return (
      <>
        {
          components.map(({ Component, props, manager }) => {
            return <Wrapper key={manager.id} Comp={Component} extraProps={props} manager={manager} />
          })
        }
      </>
    )
  }
}

export default Renderer;