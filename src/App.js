import React, { Component } from 'react';
import Sidebar from './Sidebar';
import MapContainer from './MapContainer';
import MediaQuery from 'react-responsive';
import './App.css';

export class App extends Component {
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
    }
  };

  // Styles
  containerStyles = {
    width: '100%',
    height: '100%'
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
            <Sidebar/>
          )}
          <MapContainer
            mapStyles={this.state.mapStylesMobile}
            closeNav={this.closeNav}
            screen={this.state.screenSize}
          />
        </MediaQuery>
        <MediaQuery query="(min-width: 600px)">
          <Sidebar/>
          <MapContainer
            mapStyles={this.state.mapStylesDesktop}
            closeNav={this.closeNav}
          />
        </MediaQuery>
      </div>
    );
  }
}

export default App;
