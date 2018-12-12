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
      position: {lat: 47.6780863, lng: -121.2656751},
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
      position: {lat: 47.6397989, lng: -122.2966645},
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
    sidebarVisible: 'hide',
    activeMarker: {},
    showingMarkers: this.markers,
    showingInfoWindow: false,
    animateMarker: false
  };

  /* Function: setMarkerState
   * Parameters: marker (object)
   * Description: Sets state's activeMarker to marker passed in, opens the
   *   corresponding infowindow, and triggers the marker animation, limited
   *   to 500 ms by setTimeout.
   */
   setMarkerState = (marker) => {
     // Set marker state
     this.setState({
       activeMarker: marker,
       showingInfoWindow: true,
       animateMarker: true
     }, () => {
       // Limit marker animation to 500 ms
       setTimeout(() => {
         this.setState({
           animateMarker: false
         });
       }, 500);
     });
   };

  /* Function: activateMarker
   * Parameters: marker (object)
   * Description: Grabs Foursquare data on marker venue and sets marker state.
   */
  activateMarker = (marker) => {
    this.getFoursquareData(marker)
    .then(() => {
      marker.message = 'See details from Foursquare ';
      this.setMarkerState(marker);
    })
    .catch((error) => {
      console.log('Error fetching Foursquare data');
      marker.message = 'Unable to fetch data from Foursquare :(.';
      this.setMarkerState(marker);
    });
  };

  /* Function: getProperty
   * Parameters: object, pathArray (array)
   * Description: Takes an object and the path to an object's property and
   *   returns that property if it exists. This function is a support function
   *   for getFoursquareData.
   */
   getProperty = (object, pathArray) => {
     return pathArray.reduce((obj, key) =>
       (obj && (obj[key] !== 'undefined')) ? obj[key] : null
     , object);
   }

  /* Function: getFoursquareData
   * Parameters: marker (object)
   * Description: Calls the Foursquare Places API is used to grab venue
   *   details to add to the active InfoWindow.
   */
  getFoursquareData = (marker) => {
    // Piece together URL for fetch API
    const venueSearchUrl = `https://api.foursquare.com/v2/venues/explore?client_id=FPSF0YFWC50QTDZAW5GL221N11BN4N53OWK0BASKNC3LCQIE&client_secret=L0NTMLFUSR0MLNQB1VVEPEWWIX2D4XQVTOUUPSRRT2V4KDHC&v=20180323&limit=1&ll=${marker.position.lat},${marker.position.lng}&query=${marker.name}`;

    // Foursquare venue search API call
    return fetch(venueSearchUrl)
    .then((response) => response.json())
    .then((response) => {
      // Check meta code for successful fetch
      if (response.meta.code === 200 ) {
        // Return venue id
        return this.getProperty(response, ['response', 'groups', 0, 'items', 0, 'venue', 'id']);
      } else {
        console.log('Sorry, there was an error with the venue search request.');
      }
    })
    .then((id) => {
      // save venue details url
      const venueDetailsUrl = `https://api.foursquare.com/v2/venues/${id}?client_id=FPSF0YFWC50QTDZAW5GL221N11BN4N53OWK0BASKNC3LCQIE&client_secret=L0NTMLFUSR0MLNQB1VVEPEWWIX2D4XQVTOUUPSRRT2V4KDHC&v=20180323`

      // Foursquare venue details API call
      fetch(venueDetailsUrl)
      .then((response) => response.json())
      .then((response) => {
        // Check meta code for successful fetch
        if (response.meta.code === 200) {
          // Get first venue photo
          let canonicalUrl = this.getProperty(response, ['response', 'venue', 'canonicalUrl']);
          marker.url = canonicalUrl;

          // Build photo URL if photo exists for venue
          let photo = this.getProperty(response, ['response', 'venue', 'photos', 'groups', 1, 'items', 0]);
          if (photo !== null) {
            const photoSize = '180x130';
            const photoPrefix = photo.prefix;
            const photoSuffix = photo.suffix;
            const photoUrl = photoPrefix + photoSize + photoSuffix;
            marker.photo = photoUrl;
            marker.photoAttr = 'Photo from Foursquare.';
          } else {
            // Use placeholder image
            marker.photo = 'https://via.placeholder.com/200x150.jpg?text=No+photos+:(';
            marker.photoAttr = 'No photos from Foursquare.';
            console.log(`Sorry, there are no photos available for ${marker.name}.`);
          }
        } else {
          console.log('Sorry, there was an error with the venue details request.');
        }
      })
    })
    .catch(function(error) {
        // Code for handling errors
        console.log('Sorry! There was a problem grabbing data for this location.', error);
        // marker.photoAttr = 'Error: There was a problem grabbing data from Foursquare.';
    });
  };

  /* Function: hideInfoWindow
   * Parameters: none
   * Description: Clears state's activeMarker, closes the open infowindow,
   *   and sets the marker animation to null.
   */
  hideInfoWindow = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        activeMarker: {},
        showingInfoWindow: false,
        animateMarker: false
      });
    }
  };

  /* Function: toggleNav
   * Parameters: none
   * Description: Toggles sidebar visibility.
   */
  toggleNav = () => {
    this.setState({
      sidebarVisible: (this.state.sidebarVisible === 'show') ? 'hide' : 'show'
    });
  };

  /* Function: closeNav
   * Parameters: none
   * Description: Hides sidebar from view.
   */
  closeNav = () => {
    this.setState({
      sidebarVisible: 'hide'
    });
  };

  /* Function: updateShowingMarkers
   * Parameters: markers (array of objects)
   * Description: Sets the state's showingMarkers property to the array
   *   of markers passed in.
   */
  updateShowingMarkers = (markers) => {
    this.setState({
      showingMarkers: markers
    });
  };

  // Render top level app
  render() {
    return (
      <div className="container">
        <nav className="nav">
          <button
            className={"hamburger " + this.state.sidebarVisible}
            onClick={this.toggleNav}
          >&#9776;</button>
          <div className="title">
            <h1>Dog Friendly Hikes Near Seattle</h1>
            <i className="fas fa-dog"></i>
          </div>
        </nav>
        <Sidebar
          defaultMarkers={this.markers}
          showingMarkers={this.state.showingMarkers}
          sidebarVisible={this.state.sidebarVisible}
          activeMarker={this.state.activeMarker}
          activateMarker={this.activateMarker}
          hideInfoWindow={this.hideInfoWindow}
          updateShowingMarkers={this.updateShowingMarkers}
        />
        <MapContainer
          showingMarkers={this.state.showingMarkers}
          activateMarker={this.activateMarker}
          activeMarker={this.state.activeMarker}
          showingInfoWindow={this.state.showingInfoWindow}
          hideInfoWindow={this.hideInfoWindow}
          animateMarker={this.state.animateMarker}
          closeNav={this.closeNav}
        />
      </div>
    );
  }
}

export default App;
