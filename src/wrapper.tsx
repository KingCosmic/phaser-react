import React, { Component, ReactElement } from 'react';

import manager, { ComponentManager } from './manager';

type Props = {
  extraProps: object;
  manager: ComponentManager,
  mainManager: typeof manager,
  Comp: any;
}

class Wrapper extends Component<Props> {
  stateManager: ComponentManager;

  constructor(props: Props) {
    super(props);

    this.state = { ...props.extraProps };
    this.stateManager = props.manager;
  }

  componentDidMount() {
    this.stateManager.events.on('state-change', this.setState, this);
  }

  render() {
    const { Comp, manager, mainManager } = this.props;

    return (
      <div style={{ pointerEvents: 'auto' }}>
        <Comp manager={manager} mainManager={mainManager} {...this.state} /> 
      </div>
    )
  }
}

export default Wrapper;