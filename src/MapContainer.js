import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  // state
  state = {
    activeMarker: {},
    showingInfoWindow: false,
    mapStyles: this.props.mapStyles
  };

  handleMapClick = (props) => {
    // Close nav upon map click
    this.props.closeNav();

    // Hide infowindow if one is showing already
    if (this.state.showingInfoWindow) {
      this.setState({
        activeMarker: {},
        showingInfoWindow: false
      })
    }
  }

  handleMarkerClick = (props, marker, e) => {
    // Show infowindow on marker click
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true
    });
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
        {this.props.markers.map((marker) =>
          <Marker
            key={marker.name}
            name={marker.title}
            position={marker.position}
            onClick={this.handleMarkerClick}
          />
        )}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div><h1>{this.state.activeMarker.name}</h1></div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqpBnwVoGdiPfRLdW08dfLmbluuL_f1Po'
})(MapContainer)
