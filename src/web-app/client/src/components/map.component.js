import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "./map.css";
mapboxgl.accessToken =
  "pk.eyJ1IjoiamFpd2FudGgiLCJhIjoiY2s3cXAzNHl4MDUxOTNlb2E0c25wZ3MxYyJ9.fksl8VGQfN2cxth5KvB8yg";
export default class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 78.34839,
      lat: 17.445806,
      zoom: 16.5,
      blipLocation: [],
      conduciveSensorLocation: [],
      suggestedEradicationTechnique: [],
      nonconduciveSensorLocation: [],
      pathsdata: [],
    };
  }
  renderPaths = (map) => {
    this.state.pathsdata.map((curr, i) => {
      map.addSource("lines" + i, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                color: "steelblue", // red
              },
              geometry: {
                type: "LineString",
                coordinates: curr,
              },
            },
          ],
        },
      });
      map.addLayer({
        id: "lines" + i,
        type: "line",
        source: "lines" + i,
        paint: {
          "line-width": 3,
          // Use a get expression (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-get)
          // to set the line-color to a feature property value.
          "line-color": ["get", "color"],
        },
      });
    });
  };
  renderConduciveSensors = (map) => {
    this.state.conduciveSensorLocation.map((curr, i) => {
      var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div>
        <h5>Suggested Eradication Technique</h5>` +
          this.state.suggestedEradicationTechnique[i] +
          `
        <hr>
        <h4>Sensor Data</h4>
        <ul>
        <li> Temperature :` +
          Number(curr.data[curr.data.length - 1].Temperature).toFixed(2) +
          ` &#176;C</li>
        <li> Humidity :  ` +
          Number(parseFloat(curr.data[curr.data.length - 1].Humidity)).toFixed(
            2
          ) +
          ` %</li>
        <li> Wind Speed : ` +
          Number(curr.data[curr.data.length - 1].windSpeed).toFixed(2) +
          ` mph</li>
        </ul>
        </div>`
      );
      var el = document.createElement("div");
      el.className = "marker marker-conducive";
      var marker = new mapboxgl.Marker(el)
        .setLngLat([curr.longitude, curr.latitude])
        .setPopup(popup)
        .addTo(map);
      const markerDiv = marker.getElement();

      markerDiv.addEventListener("mouseenter", () => marker.togglePopup());
      markerDiv.addEventListener("mouseleave", () => marker.togglePopup());
    });
  };
  renderNonConduciveSensors = (map) => {
    this.state.nonconduciveSensorLocation.map((curr, i) => {
      var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div>
        <h4>Sensor Data</h4>
        <ul>
        <li> Temperature :` +
          Number(curr.data[curr.data.length - 1].Temperature).toFixed(2) +
          ` &#176;C</li>
        <li> Humidity :  ` +
          Number(parseFloat(curr.data[curr.data.length - 1].Humidity)).toFixed(
            2
          ) +
          ` %</li>
        <li> Wind Speed : ` +
          Number(curr.data[curr.data.length - 1].windSpeed).toFixed(2) +
          ` mph</li>
        </ul>
        </div>`
      );
      var el = document.createElement("div");
      el.className = "marker marker-nonconducive";
      var marker = new mapboxgl.Marker(el)
        .setLngLat([curr.longitude, curr.latitude])
        .setPopup(popup)
        .addTo(map);
      const markerDiv = marker.getElement();

      markerDiv.addEventListener("mouseenter", () => marker.togglePopup());
      markerDiv.addEventListener("mouseleave", () => marker.togglePopup());
    });
  };
  renderBlips = (map) => {
    this.state.blipLocation.map((curr, i) => {
      new mapboxgl.Marker()
        .setLngLat([curr.longitude, curr.latitude])
        .addTo(map);
    });
  };
  componentDidMount() {
    var map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      preserveDrawingBuffer: true,
    });
    setTimeout(() => {
      axios
        .get("http://localhost:4000/api/SOSReport")
        .then((res) => {
          this.setState({ blipLocation: res.data });
        })
        .then(() => {
          this.renderBlips(map);
        });
      axios
        .get("http://localhost:4000/api/getSensor/conducive")
        .then((res) => {
          this.setState({
            conduciveSensorLocation: res.data[0],
            suggestedEradicationTechnique: res.data[1],
          });
        })
        .then(() => {
          this.renderConduciveSensors(map);
        });
      axios
        .get("http://localhost:4000/api/getSensor/nonconducive")
        .then((res) => {
          this.setState({ nonconduciveSensorLocation: res.data });
        })
        .then(() => {
          this.renderNonConduciveSensors(map);
        });
      axios
        .get("http://localhost:4000/api/getPath")
        .then((res) => {
          this.setState({ pathsdata: res.data });
        })
        .then(() => {
          this.renderPaths(map);
        });
    }, 1000);
  }
  render() {
    return (
      <div>
        <div
          id="map"
          ref={(el) => (this.mapContainer = el)}
          className="mapContainer"
        />
      </div>
    );
  }
}
