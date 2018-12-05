import React, { Component } from 'react';

class Sidebar extends Component {
  // styles
  sidebarStyles = {
    display: 'block',
    width: '20%',
    height: '100%',
    position: 'absolute',
    order: 1
  };

  render() {
    return (
      <div style={this.sidebarStyles}>
        <h1>Howdy</h1>
      </div>
    );
  }
}

export default Sidebar;
