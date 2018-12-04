import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  // Markers array for marker objects
  markers = [
    {
      name: 'Rattlesnake Ridge',
      position: {lat: 47.4913444, lng: -121.8002557},
      title: 'Rattlesnake Ridge'
    },
    {
      name: 'Lake Twenty-Two Trailhead',
      position: {lat: 48.0768597, lng: -121.7480719},
      title: 'Lake Twenty-Two'
    },
    {
      name: 'Red Top Lookout',
      position: {lat: 47.307951, lng: -120.8206112},
      title: 'Red Top Lookout'
    },
    {
      name: 'Barclay Lake Trailhead',
      position: {lat: 47.7924958, lng: -121.4615111},
      title: 'Barclay Lake'
    },
    {
      name: 'Tonga Ridge Trailhead',
      position: {lat: 47.7924958, lng: -121.4615111},
      title: 'Tonga Ridge'
    },
    {
      name: 'Cedar Butte Trail',
      position:{lat: 47.4315858, lng: -121.7480878},
      title: 'Cedar Butte'
    },
    {
      name: 'Cougar Mountain Regional Wildland Park',
      position: {lat: 47.528257, lng: -122.1018782},
      title: 'Cougar Mountain'
    },
    {
      name: 'Washington Park Arboretum UW Botanic Gardens',
      position: {lat: 47.528257, lng: -122.1018782},
      title: 'Washington Park Arboretum'
    },
    {
      name: 'Heather Lake Trail',
      position: {lat: 48.0731133, lng: -121.7870798},
      title: 'Heather Lake'
    }
  ];

  render() {
    return (
      <Map
        google={this.props.google}
        initialCenter={{lat: 47.6131742, lng: -122.482491}}
        zoom={8}
      >
        {this.markers.map((marker) =>
          <Marker
            key={marker.name}
            position={marker.position}
          />
        )}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqpBnwVoGdiPfRLdW08dfLmbluuL_f1Po'
})(MapContainer)
