import React, { Component } from 'react';
import { Map, Polyline, Polygon, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { connect} from 'react-redux';
import Loading from '../components/Loading';
import Popup from "reactjs-popup";
import Event from '../components/Event.js';
import arrow from '../img/arrow.png'


const mapStyles = {
  map: {
    position: 'absolute',
    "margin-top": '1%',
    "margin-left": '6%',
    width: '80%',
    height: '62%',
    border: 'solid 2px black',
  }

};

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    places:[],
    strollOn: false,
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

  strollOnToggle =() => {
    this.setState({
      strollOn: !this.state.strollOn
    })
  }

  // icon={place.personPic}
  // https://developers.google.com/maps/documentation/javascript/reference/#Marker
  // https://tomchentw.github.io/react-google-maps/#marker

  render() {
    const style = Object.assign({}, mapStyles.map);
    // console.log("PPS - redux", this.props.pps)
    // console.log("Places - state", this.state.places)
    console.log("Stroll", this.state.strollOn)
    // console.log("Place", this.state.selectedPlace)
    // console.log("PROPS", this.props)
    // console.log("LOCATION", this.state.currentLocation)
    const place = this.state.selectedPlace
    // console.log("Place", place)
    const folkWalks = [
      {lat: 40.773871, lng: -73.983178},
      {lat: 40.8194, lng: -73.95},
      {lat: 40.708850, lng: -74.007871},
      {lat: 40.701100, lng: -74.007870},
      {lat: 40.708850, lng: -74.007870},
      {lat: 40.736881, lng: -74.008499},
      {lat: 40.733210, lng: -74.003020},
      {lat: 40.733210, lng: -74.003020},
    ];
    console.log(folkWalks)

    return (
      <div>
      <div className="stroll">
      <h1 style={{"textAlign": "center"}}> HAVE A STROLL WITH US: </h1>

      <button className="notbutton teal center" onClick={this.strollOnToggle} style={{"display": "block"}}> map a stroll </button><br/>
      </div>
      <div className="map" style={style}>
      {this.state.currentLocation.lat !== null ?
        <>
          <Map
             google={this.props.google}
             zoom={13}
             style={mapStyles}
             initialCenter={this.state.currentLocation}
           >
           {this.displayMarkers()}
           {this.state.strollOn === true ?
             <Polygon
               paths={folkWalks}
               strokeColor="#0000FF"
               strokeOpacity={0.8}
               strokeWeight={2} />
            : null }
           <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div style={{"border": "black 1px solid"}}>
                <h2 className="infoWindow">{place.name}</h2>
                <p className="infoWindow"> {place.desc}</p>
                <h4 className="infoWindow">Related person:</h4>
                <p className="infoWindow inline"><a href={`/bios/${place.personId}`}> &nbsp; {place.personName} </a></p>
                <div className="image-cropper-mini-iw inline left">
                  <a href={`/bios/${place.personId}`} ><img src={place.personPic} alt={place.personName} /></a>
                </div>
              </div>
            </InfoWindow>
          </Map>
       </>
      : <Loading/>}
      </div>
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
