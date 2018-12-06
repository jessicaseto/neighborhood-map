import React, { Component } from 'react';
import Sidebar from './Sidebar';
import MapContainer from './MapContainer';
import MediaQuery from 'react-responsive';
import './App.css';

export class App extends Component {
  // State
  state = {
    sidebarVisible: false
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

  render() {
    return (
      <div style={this.containerStyles}>
        <MediaQuery query="(max-width: 600px)">
          <button
            className="hamburger"
            onClick={this.toggleNav}
          >&#9776;</button>
          {!this.state.sidebarVisible && (
            <Sidebar/>
          )}
        </MediaQuery>
        <MapContainer/>
      </div>
    );
  }
}

export default App;
