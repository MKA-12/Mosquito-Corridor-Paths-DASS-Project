import React, { Component } from "react";
import ReactMapGL, { Marker, StaticMap, Popup } from "react-map-gl";
import axios from "axios";
import DeckGL from "@deck.gl/react";
import { LineLayer, PathLayer } from "@deck.gl/layers";
import { MdLocationOn } from "react-icons/md";
import { GoRadioTower } from "react-icons/go";
const data = [
  {
    path: [
      [78.34832657301867, 17.44807562924946],
      [78.34962476218188, 17.44685763728758],
    ]
  }
];
const data1=[
  {
    path: [
      [78.34832657301867, 17.44807562924946],
      [78.34230222616629, 17.44494568613177],
    ]
  }
];
const data2 = [
  {
    path:[
      [ 78.34609981858057,  17.445443033098826 ],
      [ 78.34850222616629,  17.44394568613177],
    ]
  }
]
export default class Map extends Component {
  state = {
    viewport: {
      // width: 1111,
      // height: 800,
      latitude: 17.445806,
      longitude: 78.348390,
      zoom: 16.5
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
    conduciveSensorLocation: [
      { longitude: 78.348, latitude: 17.4476 },
      { longitude: 78.347, latitude: 17.4456 },
      { longitude: 78.347, latitude: 17.4446 },
      { longitude: 78.3503671869923, latitude: 17.444856796402092 },
      { longitude: 78.34609981858057, latitude: 17.445443033098826 },
      { longitude: 78.34850222616629, latitude: 17.44394568613177 }
    ],
    nonconduciveSensorLocation: [],
    pathsdata: [],
    eradicationTechnique:{
      longitude: 0.0, latitude: 0.0 ,message:""
    }
  };
  componentDidMount() {
    axios.get("http://localhost:4000/api/SOSReport").then(res => {
      this.setState({ blipLocation: res.data });
    });
    axios.get("http://localhost:4000/api/getSensor/conducive").then(res => {
      this.setState({ conduciveSensorLocation: res.data });
    });
    axios.get("http://localhost:4000/api/getSensor/nonconducive").then(res => {
      this.setState({ nonconduciveSensorLocation: res.data });
    });
    axios.get("http://localhost:4000/api/getPath").then(res => {
      this.setState({ pathsdata: res.data })
    });
    setInterval(() => {
      axios.get("http://localhost:4000/api/SOSReport").then(res => {
        this.setState({ blipLocation: res.data });
      });
      axios.get("http://localhost:4000/api/getSensor/conducive").then(res => {
        this.setState({ conduciveSensorLocation: res.data });
      });
      axios.get("http://localhost:4000/api/getSensor/nonconducive").then(res => {
        this.setState({ nonconduciveSensorLocation: res.data });
      });
      axios.get("http://localhost:4000/api/getPath").then(res => {
        this.setState({ pathsdata: res.data })
      });
    }, 10000);
  }
  _onViewportChange = viewport => {
    this.setState({ viewport });
  };
renderPopup = () =>{
  // if(this.state.showPopup){
    // console.log("inpopup")
  return(
<Popup
          latitude={this.state.eradicationTechnique.latitude}
          longitude={this.state.eradicationTechnique.longitude}
          closeButton={true}
          closeOnClick={true}
          onClose={() => {this.setState({showPopup: false})
            console.log("hello")
          }}
          anchor="top"
          id="Popover1"
          dynamicPosition={false}
          style={{  opacity: 100,
            width: 150,
            height: 150,
            opacity: 1}} 
          >
          <div>{this.state.eradicationTechnique.message}</div>
        </Popup>
  )
          // }
}
  render() {
    const layer = [
      
    ];
    const {showPopup} = this.state;
    return (
      
      <React.Fragment>
        {this.state.pathsdata.map((curr, i) => {
          const newdata = [
            {
              path: curr
            }
          ];
          console.log(i, curr)
          layer.push(new PathLayer({
            id: "path-layer",
            data:newdata,
            getWidth: () => 2,
            getColor: () => [101, 147, 245],
            widthMinPixels: 4,
            
          }))
        })
        }
        {/* {
          layer.push(new PathLayer({
            id: "path-layer",
            data:data,
            getWidth: () => 2,
            getColor: () => [101, 147, 245],
            widthMinPixels: 4,
            pickable:true,
            onHover:  (info) =>{
              {
              this.setState({showPopup:true, eradicationTechnique:{
                latitude:info.lngLat[1],
                longitude:info.lngLat[0],
                message: "Suggested ET 1"
              }})
              
              console.log(this.state.eradicationTechnique.message)
            }
          }
          }))
        }{
          layer.push(new PathLayer({
            id: "path-layer",
            data:data2,
            getWidth: () => 2,
            getColor: () => [101, 147, 245],
            widthMinPixels: 4,
            pickable:true,
            onHover:  (info) =>{
              {
              this.setState({showPopup:true, eradicationTechnique:{
                latitude:info.lngLat[1],
                longitude:info.lngLat[0],
                message: "Suggested ET3 "
              }})
              
              console.log(this.state.eradicationTechnique.message)
            }
          }
          }))
        } */}
        <DeckGL
          initialViewState={this.state.viewport}
          controller={true}
          // width={2000}
          // height={1050}
          // width={this.state.viewport.width}
          // height={this.state.viewport.height}
          layers={layer}
          // style={{ "margin-top": 124, "margin-left": 497 }}
        >
          <ReactMapGL
            mapStyle="mapbox://styles/mapbox/streets-v11"
            // {...this.state.viewport}
            // onViewportChange={this._onViewportChange}
            mapboxApiAccessToken="pk.eyJ1IjoiamFpd2FudGgiLCJhIjoiY2s3cXAzNHl4MDUxOTNlb2E0c25wZ3MxYyJ9.fksl8VGQfN2cxth5KvB8yg"
          >
            {/* {showPopup && this.renderPopup()} */}
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
            {this.state.conduciveSensorLocation.map((curr, i) => {
              return (
                <Marker
                  latitude={parseFloat(curr.latitude) - 0.0001}
                  longitude={parseFloat(curr.longitude) - 0.0001}
                  offsetTop={-30}
                >
                  <div>
                    <GoRadioTower size={30} style={{ color: "red" }} />
                  </div>
                </Marker>
              );
            })}
            {this.state.nonconduciveSensorLocation.map((curr, i) => {
              return (
                <Marker
                  latitude={parseFloat(curr.latitude) - 0.0001}
                  longitude={parseFloat(curr.longitude) - 0.0001}
                  offsetTop={-30}
                >
                  <div>
                    <GoRadioTower size={30} style={{ color: "black" }} />
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
