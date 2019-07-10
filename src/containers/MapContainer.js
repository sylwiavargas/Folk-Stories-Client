import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { connect} from 'react-redux';
import Loading from '../components/Loading';
import Popup from "reactjs-popup";
import Event from '../components/Event.js';


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

  getPps = () => {
    fetch(`http://localhost:3000/api/v1/pps`)
      .then(res => res.json())
      .then(pps => this.props.savePps(pps))
    }



  componentDidMount(){
    this.getPps()
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
     onClick={this.onMarkerClick}
     name={'Kenyatta International Convention Centre'}
     />
    })
  }

  render() {
    const style = Object.assign({}, mapStyles.map);
    console.log("PROPS", this.props)
    console.log("LOCATION", this.state.currentLocation)

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


const mapStateToProps = state => {
  return {
    places: state.places.places,
    place: state.places.place,
    pps: state.places.pps,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    savePlaces: (places) => {
      dispatch({type: 'SAVE_PLACES', payload: places})
    },
    savePlace: (place) => {
      dispatch({type: "SAVE_PLACE", payload: place})
    },
    savePps: (pps) => {
      dispatch({type: 'SAVE_PPS', payload: pps})
    }
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer));
