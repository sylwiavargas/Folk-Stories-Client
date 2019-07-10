import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { connect} from 'react-redux';
import Loading from '../components/Loading';
import Popup from "reactjs-popup";
import Event from '../components/Event.js';


const mapStyles = {
  map: {
    position: 'absolute',
    "margin-top": '1%',
    "margin-left": '6%',
    width: '80%',
    height: '80%',
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
    .then(() => this.savePlacesToState())
  }

  savePlacesToState = () => {
    let places = [];
    this.props.pps.map((pp) =>
      places.push(
        {ppId: pp.id,
        desc: pp.description_eng,
        lat: pp.place.latitude,
        lng: pp.place.longitude,
        place_name: pp.place.name_eng,
        personId: pp.person.id,
        person_name: pp.person.name,
        personPic: pp.person.picture
        })
    )
    this.setState({
      places: places
    })
    // console.log("here's your array", places)
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
    // console.log("I am async-updating the location!")
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
      return <Marker key={index} id={place.personId} position={{
       lat: place.lat,
       lng: place.lng
     }}
     onClick={this.onMarkerClick}
     name={place.place_name}
     desc={place.desc}
     personName={place.person_name}
     personId={place.personId}
     personPic={place.personPic}
     />
    })
  }

  render() {
    const style = Object.assign({}, mapStyles.map);
    // console.log("PPS - redux", this.props.pps)
    // console.log("Places - state", this.state.places)
    console.log("Marker", this.state.activeMarker)
    // console.log("Place", this.state.selectedPlace)
    // console.log("PROPS", this.props)
    // console.log("LOCATION", this.state.currentLocation)
    const place = this.state.selectedPlace
    // console.log("Place", place)

    return (
      <div style={style}>
      {this.state.currentLocation.lat !== null ?
        <>
          <Map
             google={this.props.google}
             zoom={13}
             style={mapStyles}
             initialCenter={this.state.currentLocation}
           >
           {this.displayMarkers()}

           <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h3>{place.name}</h3>
                <p> {place.desc}</p>
                <h4>Related person:</h4>
                <p className="inline"><a href={`/bios/${place.personId}`}> &nbsp; {place.personName} </a></p>
                <div className="image-cropper-mini inline left">
                  <a href={`/bios/${place.personId}`}><img src={place.personPic} alt={place.personName} /></a>
                </div>
              </div>
            </InfoWindow>
          </Map>
       </>
      : <Loading/>}
      </div>
    );
  }
}

// <Link to={`/bios/${person.id}`}  key={index}> <img src = {person.picture} alt={person.name}/></Link>
// </div>

// name={place.place_name}
// desc={place.desc}
// personName={place.person_name}
// personId={place.personId}
// personPic={place.personPic}

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
