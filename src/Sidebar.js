import React, { Component } from 'react';

class Sidebar extends Component {
  // state
  state = {
    // styles
    sidebarStyles: {
      display: 'block',
      width: '25%',
      height: '100%',
      position: 'fixed',
      background: 'white',
      zIndex: 2
    }
  };

  render() {
    return (
      <div
        className="sidebar"
        style={this.state.sidebarStyles}
      >
        <h1>Dog Friendly Hikes Near Seattle</h1>
      </div>
    );
  }
}

export default Sidebar;
