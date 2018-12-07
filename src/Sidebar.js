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

  handleHikeClick = (marker) => {
    // Activate marker
    console.log('calling activateMarker from handleHikeClick', marker);
    this.props.activateMarker(marker);
  };

  render() {
    return (
      <div
        className="sidebar"
        style={this.state.sidebarStyles}
      >
        <h1>Dog Friendly Hikes Near Seattle</h1>
        <ul className="hikes-list">
          {(this.props.markers.length > 0) && (
            this.props.markers.map((marker) =>
              <li
                key={marker.name}
                onClick={() => this.handleHikeClick(marker)}
              >
                {marker.name}
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
