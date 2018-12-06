import React, { Component } from 'react';
import Sidebar from './Sidebar';
import MapContainer from './MapContainer';
import MediaQuery from 'react-responsive';
import './App.css';

export class App extends Component {
  // Full list of markers
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

  // State
  state = {
    screenSize: 'mobile',
    sidebarVisible: false,
    mapStylesMobile: {
      width: '100%',
      position: 'absolute',
      left: '0'
    },
    mapStylesDesktop: {
      width: '75%',
      position: 'absolute',
      left: '25%'
    },
    activeMarker: {},
    showingMarkers: this.markers,
    showingInfoWindow: false
  };

  // Styles
  containerStyles = {
    width: '100%',
    height: '100%'
  };

  activateMarker = (marker) => {
    this.setState({
      activeMarker: marker
    });
  };

  showInfoWindow = () => {
    this.setState({
      showingInfoWindow: true
    });
  };

  hideInfoWindow = () => {
    this.setState({
      showingInfoWindow: false
    });
  };

  toggleNav = () => {
    this.setState({
      sidebarVisible: !this.state.sidebarVisible
    });
  };

  closeNav = () => {
    this.setState({
      sidebarVisible: false
    });
  };

  render() {
    return (
      <div style={this.containerStyles}>
        <MediaQuery query="(max-width: 599px)">
          <button
            className="hamburger"
            onClick={this.toggleNav}
          >&#9776;</button>
          {this.state.sidebarVisible && (
            <Sidebar
              activateMarker={this.activateMarker}
              markers={this.state.showingMarkers}
            />
          )}
          <MapContainer
            mapStyles={this.state.mapStylesMobile}
            closeNav={this.closeNav}
            activeMarker={this.state.activeMarker}
            activateMarker={this.activateMarker}
            markers={this.state.showingMarkers}
            showingInfoWindow={this.state.showingInfoWindow}
            showInfoWindow={this.showInfoWindow}
            hideInfoWindow={this.hideInfoWindow}
          />
        </MediaQuery>
        <MediaQuery query="(min-width: 600px)">
          <Sidebar
            activateMarker={this.activateMarker}
            markers={this.state.showingMarkers}
          />
          <MapContainer
            mapStyles={this.state.mapStylesDesktop}
            closeNav={this.closeNav}
            activeMarker={this.state.activeMarker}
            activateMarker={this.activateMarker}
            markers={this.state.showingMarkers}
            showingInfoWindow={this.state.showingInfoWindow}
            showInfoWindow={this.showInfoWindow}
            hideInfoWindow={this.hideInfoWindow}
          />
        </MediaQuery>
      </div>
    );
  }
}

export default App;
