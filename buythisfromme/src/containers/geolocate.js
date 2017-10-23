import React from 'react';
import { geolocated } from 'react-geolocated';
import Gmap from './gmap';
import Marker from './marker'

class Geo extends React.Component {
  renderMap () {
    return (
      <Gmap long={this.props.coords.longitude} lat={this.props.coords.latitude}>
        {/* <Marker /> */}
        <Marker position={{lat:this.props.coords.latitude, lng: this.props.coords.longitude}}/>
      </Gmap>
    )
  }
  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <div>
            {this.renderMap()}
            </div>
          : <div>Getting the location data&hellip; </div>;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Geo);
