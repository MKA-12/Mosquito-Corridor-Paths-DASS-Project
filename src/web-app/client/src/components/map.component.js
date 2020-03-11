import React, { Component } from "react";

import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
export class MapComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={17.75}
        style={{
          width: '1100px',
          height: '650px',
          position: "relative"
        }}
        initialCenter={{ lng: 78.349, lat: 17.4468 }}
      >
        <Marker position={{ lat: 48.0, lng: -122.0 }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDhRMX5aXXFoNDSGJihFTcCoi2X9uRqcM8",
  url: "http://maps.googleapis.com/maps/api/js"
})(MapComponent);
