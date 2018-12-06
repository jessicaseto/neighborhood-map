import React, { Component } from 'react';
import Sidebar from './Sidebar';
import MapContainer from './MapContainer';
import './App.css';

export class App extends Component {
  // Styles
  containerStyles = {
    width: '100%',
    height: '100%'
  };

  render() {
    return (
      <div
        style={this.containerStyles}
      >
        <Sidebar/>
        <MapContainer/>
      </div>
    );
  }
}

export default App;
