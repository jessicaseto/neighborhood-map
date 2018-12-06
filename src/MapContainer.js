import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  // state
  state = {
    mapStyles: this.props.mapStyles
  };

  handleMapClick = (props) => {
    // Close nav upon map click
    this.props.closeNav();

    // Hide infowindow if one is showing already
    if (this.props.showingInfoWindow) {
      this.props.hideInfoWindow();
    }
  }

  handleMarkerClick = (props, marker, e) => {
    // Pass active marker to App.js
    this.props.activateMarker(marker);

    // Show infowindow on marker click
    this.props.showInfoWindow();
  }

  onMarkerMounted = (element) => {
    // Pass marker to top level
    this.props.addMarker(element.marker);
  }

  render() {
    return (
      <Map
        google={this.props.google}
        initialCenter={{lat: 47.615022, lng: -122.148878}}
        zoom={8}
        onClick={this.handleMapClick}
        style={this.state.mapStyles}
      >
        {this.props.defaultMarkers.map((marker) =>
          <Marker
            key={marker.name}
            name={marker.title}
            position={marker.position}
            onClick={this.handleMarkerClick}
            ref={this.onMarkerMounted}
          />
        )}
        <InfoWindow
          marker={this.props.activeMarker}
          visible={this.props.showingInfoWindow}
        >
          <div><h1>{this.props.activeMarker.name}</h1></div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqpBnwVoGdiPfRLdW08dfLmbluuL_f1Po'
})(MapContainer)
