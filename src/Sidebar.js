import React, { Component } from 'react';
import DebounceInput from 'react-debounce-input';

class Sidebar extends Component {
  // State
  state = {
    query: ''
  };

  handleHikeClick = (marker) => {
    // Activate marker
    this.props.activateMarker(marker);
  };

  handleInputChange = (event) => {
    // Update query in state
    this.setState({
      query: event.target.value
    },
    // After query is updated, filter showingMarkers
    () => {
      if (this.state.query === '') {
        this.props.updateShowingMarkers(this.props.defaultMarkers);
      } else {
        const newMarkers = this.props.defaultMarkers.filter((marker) =>
          marker.name.toLowerCase().includes(this.state.query.toLowerCase())
        );
        this.props.updateShowingMarkers(newMarkers);
      }
    });

    // Hide InfoWindow
    this.props.hideInfoWindow();
  };

  render() {
    return (
      <div
        className={"sidebar " + this.props.sidebarVisible}
      >
        <h2>List of Hikes</h2>
        <DebounceInput
          className="hikes-search"
          debounceTimeout={300}
          type="text"
          onChange={this.handleInputChange}
        />
        <ul className="hikes-list">
          {(this.props.showingMarkers.length > 0) && (
            this.props.showingMarkers.map((marker) =>
              <li
                key={marker.name}
                className={(marker.name === this.props.activeMarker.name) ?
                  "highlight" : ""
                }
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
