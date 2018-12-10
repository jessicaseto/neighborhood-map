import React, { PureComponent } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

// Set up Map HOC with Google Map
const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultCenter={{lat: 47.615022, lng: -122.148878}}
    defaultZoom={8}
    onClick={props.onMapClick}
  >
    {props.showingMarkers.map((marker) =>
      <Marker
        key={marker.name}
        position={marker.position}
        onClick={() => props.onMarkerClick(marker)}
        animation={props.animateMarker ? (
          ((marker.name === props.activeMarker.name) && (
              window.google.maps.Animation.BOUNCE
          ))) : (
          ((marker.name === props.activeMarker.name) && (
            window.google.maps.Animation.null
          )))
        }
      />
    )}
    {props.showingInfoWindow && (
      <InfoWindow
        position={props.activeMarker.position}
        options={{pixelOffset: new window.google.maps.Size(0,-40)}}
        onCloseClick={props.hideInfoWindow}
      >
        <h2 className="info-window-h2">{props.activeMarker.title}</h2>
      </InfoWindow>
    )}
  </GoogleMap>
));

class MapContainer extends PureComponent {

  /* Function: handleMapClick
   * Parameters: props
   * Description: When map is clicked, close the sidebar on small screens
   *   and hide the infowindow if it is showing.
   */
  handleMapClick = (props) => {
    // Close nav upon map click
    this.props.closeNav();

    // Hide infowindow
    this.props.hideInfoWindow();
  };

  /* Function: handleMarkerClick
   * Parameters: marker (object)
   * Description: When a marker on the map is clicked, activate that marker
   *   and hide the sidebar on small screens.
   */
  handleMarkerClick = (marker) => {
    // Pass active marker to App.js
    this.props.activateMarker(marker);

    // Close nav upon marker click
    this.props.closeNav();
  };

  onMarkerMounted = (element) => {
    // Pass marker to top level
    if (element) {
      this.props.addMarker(element.marker);
    };
  };

  /* Function: handleInfoWindowClose
   * Parameters: none
   * Description: Close infowindow when close button is pressed on infowindow.
   */
  handleInfoWindowClose = () => {
    this.props.closeInfoWindow();
  };

  // Render the MapContainer component
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
        onMapClick={this.handleMapClick}
        onMarkerClick={this.handleMarkerClick}
        {...this.props}
      >
      </Map>
    );
  }
}

export default MapContainer;
