import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import axios from "axios";
import { MdLocationOn } from "react-icons/md";
import { GiMovementSensor } from "react-icons/gi";
function Map() {
  const [viewport, setViewport] = useState({
    width: 1111,
    height: 800,
    latitude: 17.446,
    longitude: 78.34957440477181,
    minZoom: 17,
    maxZoom: 20
  });
  const [blipLocation, blipLocationUpdate] = useState([
    { longitude: 78.34866, latitude: 17.448 },
    { longitude: 78.34856, latitude: 17.447 },
    { longitude: 78.34846, latitude: 17.446 },
    { longitude: 78.3474, latitude: 17.4455 },
    { longitude: 78.35110974166003, latitude: 17.445744868858498 },
    { longitude: 78.34729022183531, latitude: 17.446740379912782 },
    { longitude: 78.34589547314756, latitude: 17.444795668745485 }
  ]);
  const [sensorLocation, sensorLocationUpdate] = useState([
    { longitude: 78.348, latitude: 17.4476 },
    { longitude: 78.347, latitude: 17.4456 },
    { longitude: 78.347, latitude: 17.4446 },
    { longitude: 78.3503671869923, latitude: 17.444856796402092 },
    { longitude: 78.34609981858057, latitude: 17.445443033098826 },
    { longitude: 78.34850222616629, latitude: 17.44394568613177 }
  ]);
  setInterval(() => {
    axios.get("http://localhost:4000/api/SOSReport").then(res => {
      blipLocationUpdate([...blipLocation, ...res.data]);
      // console.log(res.data);
    });
    axios.get("http://localhost:4000/api/addSensor").then(res => {
      // console.log(res.data)
      sensorLocationUpdate([...sensorLocation, ...res.data]);
    });
  }, 60000);
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/streets-v11"
      {...viewport}
      onViewportChange={setViewport}
      mapboxApiAccessToken="pk.eyJ1IjoiamFpd2FudGgiLCJhIjoiY2s3cXAzNHl4MDUxOTNlb2E0c25wZ3MxYyJ9.fksl8VGQfN2cxth5KvB8yg"
    >
      {blipLocation.map((curr, i) => {
        return (
          <Marker latitude={curr.latitude} longitude={curr.longitude}>
            <div>
              <MdLocationOn size={32} style={{ color: "black" }} />
            </div>
          </Marker>
        );
      })}
      {sensorLocation.map((curr, i) => {
        return (
          <Marker
            latitude={parseFloat(curr.latitude)}
            longitude={parseFloat(curr.longitude)}
          >
            <div>
              <GiMovementSensor size={40} style={{ color: "black" }} />
            </div>
          </Marker>
        );
      })}
    </ReactMapGL>
  );
}
export default Map;
