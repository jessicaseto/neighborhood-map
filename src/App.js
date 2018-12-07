import React, { Component } from 'react';
import Sidebar from './Sidebar';
import MapContainer from './MapContainer';
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
    sidebarVisible: 'hide',
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
    showingInfoWindow: false,
    markerClicked: false
  };

  // Styles
  containerStyles = {
    width: '100%',
    height: '100%'
  };

  addMarker = (marker) => {
    this.setState((prevState) => ({
      showingMarkers: [...prevState.showingMarkers, marker]
    }));
  };

  activateMarker = (marker) => {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      markerClicked: true
    });
  };

  hideInfoWindow = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        activeMarker: {},
        showingInfoWindow: false
      });
    }
  };

  toggleNav = () => {
    this.setState({
      sidebarVisible: (this.state.sidebarVisible === 'show') ? 'hide' : 'show'
    });
  };

  closeNav = () => {
    this.setState({
      sidebarVisible: 'hide'
    });
  };

  render() {
    return (
      <div style={this.containerStyles}>
        <nav className="nav">
          <button
            className={"hamburger " + this.state.sidebarVisible}
            onClick={this.toggleNav}
          >&#9776;</button>
          <div className="title">
            <h1>Dog Friendly Hikes Near Seattle</h1>
          </div>
        </nav>
        <Sidebar
          markers={this.state.showingMarkers}
          sidebarVisible={this.state.sidebarVisible}
        />
        <MapContainer
          defaultMarkers={this.markers}
          showingMarkers={this.state.showingMarkers}
          activateMarker={this.activateMarker}
          activeMarker={this.state.activeMarker}
          showingInfoWindow={this.state.showingInfoWindow}
          hideInfoWindow={this.hideInfoWindow}
          markerClicked={this.state.markerClicked}
        />
      </div>
    );
  }
}

export default App;
