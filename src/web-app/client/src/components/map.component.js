import React, { Component } from "react";
import ReactMapGL, { Marker, StaticMap } from "react-map-gl";
import axios from "axios";
import DeckGL from "@deck.gl/react";
import { LineLayer, PathLayer } from "@deck.gl/layers";
import { MdLocationOn } from "react-icons/md";
import { GoRadioTower } from "react-icons/go";
const data = [
  {
    name: "random-name",
    color: [101, 147, 245],
    path: [
      [78.49286950106101, 17.407326571684294],
      [78.49174051105838, 17.407695768267814]
    ]
  }
];

export default class Map extends Component {
  state = {
    viewport: {
      width: 1140,
      height: 800,
      longitude: 78.49234631777769,
      latitude: 17.407457481400613,
      zoom: 18.5
    },
    blipLocation: [
      { longitude: 78.34866, latitude: 17.448 },
      { longitude: 78.34856, latitude: 17.447 },
      { longitude: 78.34846, latitude: 17.446 },
      { longitude: 78.3474, latitude: 17.4455 },
      { longitude: 78.35110974166003, latitude: 17.445744868858498 },
      { longitude: 78.34729022183531, latitude: 17.446740379912782 },
      { longitude: 78.34589547314756, latitude: 17.444795668745485 }
    ],
    sensorLocation: [
      { longitude: 78.348, latitude: 17.4476 },
      { longitude: 78.347, latitude: 17.4456 },
      { longitude: 78.347, latitude: 17.4446 },
      { longitude: 78.3503671869923, latitude: 17.444856796402092 },
      { longitude: 78.34609981858057, latitude: 17.445443033098826 },
      { longitude: 78.34850222616629, latitude: 17.44394568613177 }
    ]
  };
  componentDidMount() {
    axios.get("http://localhost:4000/api/SOSReport").then(res => {
      this.setState({ blipLocation: res.data });
    });
    axios.get("http://localhost:4000/api/addSensor").then(res => {
      this.setState({ sensorLocation: res.data });
    });
    setInterval(() => {
      axios.get("http://localhost:4000/api/SOSReport").then(res => {
        this.setState({ blipLocation: res.data });
      });
      axios.get("http://localhost:4000/api/addSensor").then(res => {
        this.setState({ sensorLocation: res.data });
      });
    }, 10000);
  }
  _onViewportChange = viewport => {
    this.setState({ viewport });
  };

  render() {
    const layers = [new LineLayer({ id: "line-layer", data })];
    const layer = [
      new PathLayer({
        id: "path-layer",
        data,
        getWidth: data => 2,
        getColor: data => data.color,
        widthMinPixels: 7
      })
    ];
    return (
      <React.Fragment>
        <DeckGL
          initialViewState={this.state.viewport}
          controller={true}
          layers={layers}
          width={this.state.viewport.width}
          height={this.state.viewport.height}
          layers={layer}
          style={{"margin-top":124,"margin-left":497}}
        >
          <ReactMapGL
            mapStyle="mapbox://styles/mapbox/streets-v11"
            // {...this.state.viewport}
            // onViewportChange={this._onViewportChange}
            mapboxApiAccessToken="pk.eyJ1IjoiamFpd2FudGgiLCJhIjoiY2s3cXAzNHl4MDUxOTNlb2E0c25wZ3MxYyJ9.fksl8VGQfN2cxth5KvB8yg"
          >
            {this.state.blipLocation.map((curr, i) => {
              return (
                <Marker
                  latitude={curr.latitude}
                  longitude={curr.longitude}
                  offsetTop={-32}
                >
                  <div>
                    <MdLocationOn size={32} style={{ color: "black" }} />
                  </div>
                </Marker>
              );
            })}
            {this.state.sensorLocation.map((curr, i) => {
              return (
                <Marker
                  latitude={parseFloat(curr.latitude)}
                  longitude={parseFloat(curr.longitude)}
                  offsetTop={-40}
                >
                  <div>
                    <GoRadioTower size={40} style={{ color: "black" }} />
                  </div>
                </Marker>
              );
            })}
          </ReactMapGL>
        </DeckGL>
      </React.Fragment>
    );
  }
}
