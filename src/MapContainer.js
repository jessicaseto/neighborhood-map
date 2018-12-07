import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultCenter={{lat: 47.615022, lng: -122.148878}}
    defaultZoom={8}
  >
    {props.defaultMarkers.map((marker) =>
      <Marker
        key={marker.name}
        position={marker.position}
        onClick={() => props.onMarkerClick(marker)}
      />
    )}
    {(Object.keys(props.activeMarker).length !== 0) && (
      <InfoWindow
        position={props.activeMarker.position}
        options={{pixelOffset: new window.google.maps.Size(0,-40)}}
        visible={props.showingInfoWindow}
      >
        <h1>{props.activeMarker.title}</h1>
      </InfoWindow>
    )}
  </GoogleMap>
));

class MapContainer extends Component {
  handleMapClick = (props) => {
    // Close nav upon map click
    this.props.closeNav();

    // Hide infowindow
    this.props.hideInfoWindow();
  }

  handleMarkerClick = (marker) => {
    // Pass active marker to App.js
    this.props.activateMarker(marker);
  }

  onMarkerMounted = (element) => {
    // Pass marker to top level
    if (element) {
      this.props.addMarker(element.marker);
    }
  }

  onInfoWindowMounted = (element) => {
    if (element) {
      console.log(element.infowindow);
    }
  }

  render() {
    return (
      <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBqpBnwVoGdiPfRLdW08dfLmbluuL_f1Po&v=3.exp"
        loadingElement = {
          <div className="loading-element"/>
        }
        containerElement = {
          <div className="container-element"/>
        }
        mapElement = {
          <div className="map-element"/>
        }
        onMarkerClick={this.handleMarkerClick}
        {...this.props}
      >
      </Map>
    );
  }
}

export default MapContainer;
