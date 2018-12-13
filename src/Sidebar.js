import React, { Component } from 'react';
import DebounceInput from 'react-debounce-input';

class Sidebar extends Component {
  // State
  state = {
    query: ''
  };

  /* Function: handleHikeClick
   * Parameters: marker (object)
   * Description: When a hike on the sidebar is clicked, activate that hike's
   *   marker on the map.
   */
  handleHikeClick = (marker) => {
    // Check for Google Maps authentication failure
    if (!window.gmAuthFailure) {
      // Activate marker
      this.props.activateMarker(marker);
    }
  };

  /* Function: handleInputChange
   * Parameters: event object
   * Description: When the controlled input component's field is updated,
   *   update the state's query property with the value in the input field.
   *   Once the query is updated, filter the list of currently showing markers
   *   to only contain the markers that match the query.
   */
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
          marker.title.toLowerCase().includes(this.state.query.toLowerCase())
        );
        this.props.updateShowingMarkers(newMarkers);
      }
    });

    // Hide InfoWindow
    this.props.hideInfoWindow();
  };

  // Render the Sidebar Component
  render() {
    return (
      <div
        className={"sidebar " + this.props.sidebarVisible}
        role="navigation"
      >
        <h2>List of Hikes</h2>
        <DebounceInput
          className="hikes-search"
          minLength={1}
          debounceTimeout={300}
          type="text"
          placeholder="Filter by hike name"
          onChange={this.handleInputChange}
        />
        <ul className="hikes-list">
          {(this.props.showingMarkers.length > 0) && (
            this.props.showingMarkers.map((marker) =>
              <li
                key={marker.name}
                tabIndex="0"
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
