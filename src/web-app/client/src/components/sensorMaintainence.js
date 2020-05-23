import React, { Component } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "./map.css";
import { Navbar, NavbarBrand } from "reactstrap";
import ReactMapGL, { Marker } from "react-map-gl";
import { GoRadioTower } from "react-icons/go";
import ModalTemplate from "./ModalTemplate";
var moment = require("moment");
// mapboxgl.accessToken =
//   "pk.eyJ1IjoiamFpd2FudGgiLCJhIjoiY2s3cXAzNHl4MDUxOTNlb2E0c25wZ3MxYyJ9.fksl8VGQfN2cxth5KvB8yg";
export default class SensorMaintainence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 78.34839,
      lat: 17.445806,
      zoom: 16.5,
      latitude: "",
      longitude: "",
      ChannelId: "",
      ChannelKey: "",
      allsensors: [],
      exportPopup: false,
      fromDate: "",
      toDate: "",
      InvalidAttributes: false,
      Success: false,
      exportlat: "",
      exportlng: "",
      exportid: "",
      noData: false,
    };
    this.objecttoCSV = this.objecttoCSV.bind(this);
    this.download = this.download.bind(this);
    this.getReport = this.getReport.bind(this);
  }
  objecttoCSV(data) {
    const csvrows = [];
    const headers = Object.keys(data[0]);
    csvrows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvrows.push(values.join(","));
    }
    return csvrows.join("\n");
  }
  download(data) {
    const blob = new Blob([data], {
      type: "text/csv",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "download.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  async getReport(res) {
    const got = await res;
    const data = got.data.map((row) => ({
      Date: row.date,
      Time: row.time,
      Longitude: this.state.exportlng,
      Latitude: this.state.exportlat,
      Temperature: row.Temperature,
      Humidity: row.Humidity,
      WindSpeed: row.windSpeed,
    }));
    if (data.length != 0) {
      const csvdata = this.objecttoCSV(data);
      this.download(csvdata);
    }
    else {
      this.setState({ noData: true, Success: false, InvalidAttributes: false })
    }

  }
  setLatLongMarker = (obj) => {
    this.setState({ latitude: obj.lat, longitude: obj.lng });
  };
  onChangeLatitude = (e) => {
    this.setState({ latitude: e.target.value });
  };
  onChangeLongitude = (e) => {
    this.setState({ longitude: e.target.value });
  };
  onChangeChannelid = (e) => {
    this.setState({ ChannelId: e.target.value });
  };
  onChangeChannelKey = (e) => {
    this.setState({ ChannelKey: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (
      Number(this.state.latitude) < 17.448810090060803 &&
      Number(this.state.longitude) > 17.44263033504224 &&
      Number(this.state.longitude) < 78.35107557927012 &&
      Number(this.state.longitude) > 78.34463589731887 &&
      this.state.ChannelId !== "" &&
      this.state.ChannelKey !== ""
    ) {
      const Sensor = {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        channelId: this.state.ChannelId,
        channelKey: this.state.ChannelKey,
        data: [],
      };

      axios
        .post("http://localhost:4000/api/addSensor", Sensor)
        .then((res) => {
          if (res.status === 200 && res.data === true) {
            this.setState({
              latitude: "",
              longitude: "",
              ChannelId: "",
              ChannelKey: "",
            });
            alert("New Sensor added");
          } else if (res.status === 200 && res.data === false) {
            alert("Given Channel ID and key combination doesn't exist");
          } else {
            alert("Couldn't add new sensor");
          }
          return res;
        })
        .then((res) => {
          if (res.status === 200 && res.data === true) {
            axios
              .get("http://localhost:4000/api/addSensor")
              .then((out) => {
                this.setState({ allsensors: out.data });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("enter valid latitiude and longitude");
    }
  };
  resetState = () => {
    axios
      .get("http://localhost:4000/api/addSensor")
      .then((res) => {
        this.setState({ allsensors: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onDelete = (curr) => {
    let route = "http://localhost:4000/api/addSensor/" + curr._id;
    axios.delete(route);
    this.resetState();
  };
  onExport = (curr) => {

    this.setState({ exportPopup: true, exportid: curr._id, exportlat: curr.latitude, exportlng: curr.longitude })
  }
  reset = () => {
    this.setState({ exportPopup: false, exportid: '', exportlat: '', exportlng: '', Success: false, InvalidAttributes: false, noData: false })
  }
  renderMapSensor = () => {
    var map = new mapboxgl.Map({
      container: this.mapClassSensorPlace,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    var marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([this.state.lng, this.state.lat])
      .addTo(map);
    marker.on(
      "dragstart",
      function () {
        this.setLatLongMarker(marker.getLngLat());
      }.bind(this)
    );
    marker.on(
      "drag",
      function () {
        this.setLatLongMarker(marker.getLngLat());
      }.bind(this)
    );
    marker.on(
      "dragend",
      function () {
        this.setLatLongMarker(marker.getLngLat());
      }.bind(this)
    );

    map.on(
      "movestart",
      function (e) {
        marker.setLngLat(map.getCenter());
        this.setLatLongMarker(map.getCenter());
      }.bind(this)
    );

    map.on(
      "move",
      function (e) {
        marker.setLngLat(map.getCenter());
        this.setLatLongMarker(map.getCenter());
      }.bind(this)
    );

    map.on(
      "moveend",
      function (e) {
        marker.setLngLat(map.getCenter());
        this.setLatLongMarker(map.getCenter());
      }.bind(this)
    );
  };
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/addSensor")
      .then((res) => {
        this.setState({ allsensors: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    this.renderMapSensor();
  }
  toggle = () => {
    this.setState({ showPopUp: !this.state.showPopUp });
  };
  onChangeFromDate = (e) => {
    this.setState({ fromDate: e.target.value });
  };
  onChangeToDate = (e) => {
    this.setState({ toDate: e.target.value });
  };
  InvalidAttributesPrompt = () => {
    return <div style={{ color: "red" }}> Enter the attributes required</div>;
  };
  successprompt = () => {
    return (
      <div style={{ color: "green", background: "lightgreen", padding: 0 }}>
        Data Got Exported
      </div>
    );
  };
  noDataPrompt = () => {
    return (
      <div style={{ color: "red" }}>
        No Data available for the required time frame
      </div>
    )
  }
  onExportSubmit = (e) => {
    e.preventDefault();
    const DataAttr = {
      id: this.state.exportid,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
    }
    if (
      moment(this.state.fromDate, "YYYY-MM-DD", true).isValid() &&
      moment(this.state.toDate, "YYYY-MM-DD", true).isValid()
    ) {

      axios
        .put("http://localhost:4000/api/addSensor/export", DataAttr)
        .then((res) => {
          this.setState({ fromDate: "", toDate: "" });
          this.getReport(res);
          this.setState({ Success: true, InvalidAttributesPrompt: false, noData: false });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ InvalidAttributes: true, Success: false, noData: false });
    }
  }
  render() {
    return (
      <React.Fragment>
        <Navbar
          style={{ backgroundColor: "black" }}
          inverse="true"
          className="fixed-top"
          // color="dark"
          dark
        >
          <NavbarBrand>
            Mosquito Corridor Detection and Visualization System
          </NavbarBrand>
        </Navbar>

        <div id="container" style={{backgroundColor:"#D3D3D3"}}>
          <div className="MapComponent" style={{borderStyle:'solid'}}>
          <Navbar
          style={{ backgroundColor: "black"}}
          dark
        >
          <NavbarBrand>
            Add Sensor
          </NavbarBrand>
        </Navbar>
            <div style={{padding:10}}>
              <div
                id="map"
                ref={(el) => (this.mapClassSensorPlace = el)}
                className="mapClassSensorPlace"
              />
              <br />
              <form
                className="form-inline"
                onSubmit={this.onSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div className="form-group mx-sm-3 mb-2">
                  <label for="latitude" className="sr-only">
                    Latitude
                </label>
                  <input
                    type="text"
                    className="form-control"
                    id="latitude"
                    placeholder="Latitude"
                    value={this.state.latitude}
                    onChange={this.onChangeLatitude}
                  />
                </div>
                <div className="form-group mx-sm-3 mb-2">
                  <label for="longitude" className="sr-only">
                    Longitude
                </label>
                  <input
                    type="text"
                    className="form-control"
                    id="longitude"
                    placeholder="Longitude"
                    value={this.state.longitude}
                    onChange={this.onChangeLongitude}
                  />
                </div>
                <div className="form-group mx-sm-3 mb-2">
                  <label for="ChannelId" className="sr-only">
                    Channel Id
                </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ChannelId"
                    placeholder="Channel ID"
                    value={this.state.ChannelId}
                    onChange={this.onChangeChannelid}
                  />
                </div>
                <div className="form-group mx-sm-3 mb-2">
                  <label for="ChannelKey" className="sr-only">
                    ChannelKey
                </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ChannelKey"
                    placeholder="Channel Key"
                    value={this.state.ChannelKey}
                    onChange={this.onChangeChannelKey}
                  />
                </div>
                <input
                  type="submit"
                  value="Add Sensor"
                  className="btn btn-primary mb-2"
                />
              </form>
            </div>
          </div>
          <div
            id="Table"
            style={{
              // "max-height": "calc(100vh - 210px)",
              "overflow-y": "auto",
              backgroundColor:"white"
            }}
          >
            <div>

              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Sensor id</th>
                    <th>Map</th>
                    <th>data</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.allsensors.map((curr, i) => {
                    return (
                      <tr key={i.toString()}>
                        <td>{i + 1}</td>
                        {/* <td>{curr.latitude}</td>
                      <td>{curr.longitude}</td> */}
                        <td id={"sensor" + i}>
                          {/* <div
                          id={"map" + i}
                          ref={(el) => (this["mapInTable" + i] = el)}
                          className="mapInTable"
                        /> */}
                          <ReactMapGL
                            width={400}
                            height={200}
                            latitude={parseFloat(curr.latitude)}
                            longitude={parseFloat(curr.longitude)}
                            zoom={16.5}
                            mapStyle="mapbox://styles/mapbox/streets-v9"
                            mapboxApiAccessToken="pk.eyJ1IjoiamFpd2FudGgiLCJhIjoiY2s3cXAzNHl4MDUxOTNlb2E0c25wZ3MxYyJ9.fksl8VGQfN2cxth5KvB8yg"
                          >
                            <Marker
                              latitude={parseFloat(curr.latitude) - 0.0001}
                              longitude={parseFloat(curr.longitude) - 0.0001}
                              offsetTop={-30}
                            >
                              <div>
                                <GoRadioTower size={28} />
                              </div>
                            </Marker>
                          </ReactMapGL>
                          {/* {this.renderMap(curr, i)} */}
                          <span>Latitude : {Number(curr.latitude).toFixed(4)} </span><br />
                          <span>Longitude :{Number(curr.longitude).toFixed(4)}</span>
                        </td>
                        <td>
                          <span>Temperature : {Number(curr.data[curr.data.length - 1].Temperature).toFixed(3)}</span><br />
                          <span>Humidity : {Number(parseFloat(curr.data[curr.data.length - 1].Humidity)).toFixed(3)}</span><br />
                          <span>Wind Speed : {Number(curr.data[curr.data.length - 1].windSpeed).toFixed(3)}</span>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => this.onDelete(curr)}
                          >
                            Delete
                        </button>
                          <br />
                          <button
                            className="btn btn-info"
                            onClick={() => this.onExport(curr)}
                          >
                            Export Data
                        </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {
            this.state.exportPopup == true ?
              <ModalTemplate
                active={true}
                title="Export Data"
                reset={this.reset}
                onSubmit={this.onExportSubmit}
              >
                <br />
                <form className="form-inline" onSubmit={this.onSubmit}>
                  <div className="form-group mx-sm-3 mb-2">
                    <label for="fromDate" className="sr-only">
                      FromDate
                </label>
                    <input
                      type="date"
                      className="form-control"
                      id="fromDate"
                      placeholder="fromDate"
                      value={this.state.fromDate}
                      onChange={this.onChangeFromDate}
                    />
                  </div>
                  <div className="form-group mx-sm-3 mb-2">
                    <label for="toDate" className="sr-only">
                      ToDate
                </label>
                    <input
                      type="date"
                      className="form-control"
                      id="toDate"
                      placeholder="toDate"
                      value={this.state.toDate}
                      onChange={this.onChangeToDate}
                    />
                  </div>
                  {/* <input type="submit" value="Export Data" class="btn btn-primary mb-2" /> */}
                </form>
                {this.state.InvalidAttributes && this.InvalidAttributesPrompt()}
                {this.state.Success && this.successprompt()}
                {this.state.noData && this.noDataPrompt()}
              </ModalTemplate>
              : null
          }
        </div>
      </React.Fragment>
    );
  }
}
