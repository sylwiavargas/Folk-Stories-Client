import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Loading from '../components/Loading'


const mapStyles = {
  map: {
    position: 'absolute',
    width: '50%',
    height: '60%',
    border: 'solid 2px black',
  }

};

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    places:[
      {lat: 40.702500, lng: -73.921830},
      {lat: 40.708850, lng: -74.007870}
    ],
    currentLocation: {
        lat: null,
        lng: null,
      }
  };

  componentDidMount(){
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    console.log("I am async-updating the location!")
  }

  // componentDidUpdate(prevProps, prevState) {
  //     if (prevState.currentLocation !== this.state.currentLocation) {
  //       console.log("changed location!", this.state.currentLocation)
  //       this.recenterMap();
  //     }
  // }

  // recenterMap() {
  //   const map = this.map;
  //   const current = this.state.currentLocation;
  //
  //   const google = this.props.google;
  //   const maps = google.maps;
  //
  //   if (map) {
  //     console.log(current.lat, current.lng)
  //    let center = new maps.LatLng(current.lat, current.lng);
  //    map.panTo(center);
  //
  //  } else {
  //    console.log("nope, not recentering")
  //  }
  //
  // }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  displayMarkers = () => {
    return this.state.places.map((place, index) => {
      return <Marker key={index} id={index} position={{
       lat: place.lat,
       lng: place.lng
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

  render() {
    const style = Object.assign({}, mapStyles.map);
    // console.log("STATE", this.state)
    // console.log("PROPS", this.props)
    console.log("LOCATION", this.state.currentLocation)
    // console.log("this map", this.map)

    // setTimeout(console.log("map here!", this.map), 5000)

    

    return (
      <div style={style}>
      {this.state.currentLocation.lat !== null ?
        <>
      <Map
         google={this.props.google}
         zoom={12}
         style={mapStyles}
         initialCenter={this.state.currentLocation}
       >
         {this.displayMarkers()}
       </Map>
       </>
       : <Loading/>}
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);
