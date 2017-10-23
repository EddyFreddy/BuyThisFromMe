import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react';

const mapStyle = {
  width: '27.5vw',
  height: '90vh',
  backgroundColor :'salmon',
};

class Gmap extends Component {
  constructor (props) {
    super(props);

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentCenter : {
        lat : lat,
        lng: lng,
      },
    };
  }

  componentDidUpdate (prevProps, prevState) {
    // console.log('THIS IS THE PREVPROPS:', prevProps, 'THIS IS THE CURRENT PROPS:', this.props.google);
    // if (prevProps.google === this.props.google) {
      // console.log('INSIDE componentDidUpdate');
        this.loadMap();

      // }
    // }
  }

  componentWillReceiveProps (nextProps) {
    //force googlemaps to update when component recieves props from redux store
    if (nextProps.markers !== this.props.markers) {
      setTimeout(() => {
        this.setState({foo:new Date()});
      }, 200);
    }
  }

  loadMap () {
    if (this.props && this.props.google) {
      //if the google api has loaded into props
      // console.log('long lat:', this.props.long, this.props.lat);

      const google = this.props.google;
      const maps = google.maps;
      //ref to App's div node
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = this.props.zoom //zoom set via default props
      //currentCenter set to default props, initialCenter set in state
      const {lat, lng} = this.state.currentCenter;
      const center = {
        lat: this.props.lat,
        lng: this.props.long
      };
      const mapConfig = {
        center: center,
        zoom: zoom,
      };
      this.map = new maps.Map(node, mapConfig);

    }
  }

  renderChildren () {
    const {children} = this.props;

    if (!children) return;
    return React.Children.map(children, c => {
      return React.cloneElement(c, {
          map: this.map,
          google: this.props.google,
          mapCenter: this.state.currentLocation
      });
    })
}

  render () {
    return (
      <div ref="map" style={mapStyle}>
        Loading map...
        {this.renderChildren()}
      </div>
    );
  }
}

Gmap.defaultProps = {
  zoom: 10,
  initialCenter: {
    lat: 51.5073509,
    lng: -0.12775829999998223,
  },
};

const mapStateToProps = (state) => ({
  markers: state.markers,
});

const connectAppToRedux = connect(mapStateToProps)(Gmap);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAOWSdDDI8bXLA1CR3yuJTcJXNDoy6r5jQ',
})(connectAppToRedux);

// import React, {Component} from 'react';
// import '../styles/App.css';
//
// import {
//   withGoogleMap,
//   GoogleMap,
//   InfoWindow,
//   Marker
// } from 'react-google-maps';
//
//
// class Gmap extends React.Component {
//   // constructor (props) {
//   //   super();
//   //   this.state = {
//   //     markers: [{
//   //       postion: {
//   //         lat: 25.0112183,
//   //         lng: 121.52067570000001
//   //       }
//   //     }]
//   //   };
//   // }
//   render () {
//     const markers = this.props.markers || []
//     return (
//       <GoogleMap
//         defaultZoom={3}
//         defaultCenter={{ lat: -25.363992, lng: 131.044922}}>
//           {markers.map((marker, index) => (
//             <Marker {...marker} />
//           ))}
//         </GoogleMap>
//     )
//   }
// }
//
// export default withGoogleMap(Gmap);
