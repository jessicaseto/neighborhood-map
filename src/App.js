import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqpBnwVoGdiPfRLdW08dfLmbluuL_f1Po'
})(MapContainer)
