import React, { Component } from 'react';

class uiWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { ...props.extraProps };
    this.stateManager = props.manager;
  }

  componentDidMount() {
    this.stateManager.events.on('state-change', (state) => {
      console.log('state changed', state)

      this.setState(state);
    })
  }

  render() {
    const { Comp, manager } = this.props;

    return (
      <Comp manager={manager} {...this.state} />
    )
  }
}

export default uiWrapper;