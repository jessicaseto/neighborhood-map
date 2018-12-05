import React, { Component } from 'react';

class Sidebar extends Component {
  // state
  state = {
    // styles
    sidebarStyles: {
      display: 'block',
      width: '25%',
      height: '100%',
      position: 'absolute'
    }
  };

  render() {
    return (
      <div style={this.state.sidebarStyles}>
        <h1>Howdy</h1>
      </div>
    );
  }
}

export default Sidebar;
