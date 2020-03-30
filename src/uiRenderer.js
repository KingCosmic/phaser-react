import React, { Component } from 'react';

import UIWrapper from './uiWrapper';

import uiManager from './state/ui';

class uiRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openUIS: []
    }
  }

  componentDidMount() {
    this.added = uiManager.events.on('ui-added', this.addUI, this);
  }

  addUI(ui) {
    this.setState({
      openUIS: [ui, ...this.state.openUIS]
    })
  }

  render() {
    let { openUIS } = this.state;

    return (
      <>
        {
          openUIS.map(({ Component, props, manager }) => {
            return <UIWrapper Comp={Component} extraProps={props} manager={manager} />
          })
        }
      </>
    )
  }
}

export default uiRenderer;