import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { MdLocationOn } from 'react-icons/md';

function Map() {
  const [viewport, setViewport] = useState({
    width: 1111,
    height: 800,
    latitude: 17.446,
    longitude: 78.34957440477181,
    minZoom: 17,
    maxZoom: 20
  });

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapboxApiAccessToken="pk.eyJ1IjoiamFpd2FudGgiLCJhIjoiY2s3cXAzNHl4MDUxOTNlb2E0c25wZ3MxYyJ9.fksl8VGQfN2cxth5KvB8yg"
    >
      <Marker latitude={17.446} longitude={78.3495} >
        <div>
          <MdLocationOn style={{color:"black"}}/>
        </div>
      </Marker>
    </ReactMapGL>
  );
}
export default Map