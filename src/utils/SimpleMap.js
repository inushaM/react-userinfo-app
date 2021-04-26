import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './marker';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: props.latitude,
      longitude: props.longitude,
      center: {
        lat: this.props.latitude,
        lng: this.props.longitude
      }
    }
  }

  static defaultProps = {
    center: {
      lat: 6.848856,
      lng: 80.025679
    },
    zoom: 11
  };

  render() {

    return (
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo' }}
          defaultCenter={this.state.center}
          defaultZoom={this.props.zoom}
        >
          {/* <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          /> */}

          <Marker
            lat={6.848856}
            lng={80.025679}
            name="My Marker"
            color="blue"
          />

        </GoogleMapReact>
      </div>
    );
  }
}



export default SimpleMap;