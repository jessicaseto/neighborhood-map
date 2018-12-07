import React, { Component } from 'react';

class Sidebar extends Component {
  handleHikeClick = (marker) => {
    // Activate marker
    console.log('calling activateMarker from handleHikeClick', marker);
    this.props.activateMarker(marker);
  };

  render() {
    return (
      <div
        className={"sidebar " + this.props.sidebarVisible}
      >
        <h2>List of Hikes</h2>
        <ul className="hikes-list">
          {(this.props.markers.length > 0) && (
            this.props.markers.map((marker) =>
              <li
                key={marker.name}
                onClick={() => this.handleHikeClick(marker)}
              >
                {marker.title}
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
