import React, { Component } from "react";
import axios from 'axios';
export default class SensorMaintainence extends Component {
    state = {
        latitude: '',
        longitude: '',
        ChannelId: '',
        ChannelKey: '',
        allsensors: [],
        dummy: '',
    }
    onChangeLatitude = (e) => {
        this.setState({ latitude: e.target.value })
        console.log(e.target.value)
    }
    onChangeLongitude = (e) => {
        this.setState({ longitude: e.target.value })
    }
    onChangeChannelid = (e) => {
        this.setState({ ChannelId: e.target.value })
    }
    onChangeChannelKey = (e) => {
        this.setState({ ChannelKey: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (Number(this.state.latitude) < 17.448810090060803 && Number(this.state.longitude) > 17.44263033504224 && Number(this.state.longitude) < 78.35107557927012 && Number(this.state.longitude) > 78.34463589731887) {
            const Sensor = {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                channelId: this.state.ChannelId,
                channelKey: this.state.ChannelKey,
                data: [],
            }

            axios.post("http://localhost:4000/api/addSensor", Sensor)
                .then(res => {
                    if (res.status === 200 && res.data == true) {
                        this.setState({ latitude: '', longitude: '', ChannelId: '', ChannelKey: '' })
                        alert("New Sensor added")
                    }
                    else if (res.status === 200 && res.data == false){
                        alert("Given Channel ID and key combination doesn't exist")
                    }
                    else{
                        alert("Couldn't add new sensor")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            alert("enter valid latitiude and longitude")
        }
    }
    onDelete = (curr) => {
        console.log(curr)
        let route = "http://localhost:4000/api/addSensor/" + curr._id
        axios.delete(route)
            .then(res => {
                this.setState({ dummy: '' })
            }).catch(err => { console.log(err) })
    }
    componentDidMount() {
        axios.get("http://localhost:4000/api/addSensor")
            .then(res => {
                this.setState({ allsensors: res.data })
            }).catch(err => { console.log(err) })
    }
    componentDidUpdate() {
        axios.get("http://localhost:4000/api/addSensor")
            .then(res => {
                this.setState({ allsensors: res.data })
            }).catch(err => { console.log(err) })
    }
    render() {
        return (
            <React.Fragment>
                <br />
                <form class="form-inline" onSubmit={this.onSubmit} style={{ position: "-moz-initial" }}>
                    <div class="form-group mx-sm-3 mb-2">
                        <label for="latitude" class="sr-only">Latitude</label>
                        <input type="text" class="form-control" id="latitude" placeholder="Latitude" value={this.state.latitude} onChange={this.onChangeLatitude} />
                    </div>
                    <div class="form-group mx-sm-3 mb-2">
                        <label for="longitude" class="sr-only">Longitude</label>
                        <input type="text" class="form-control" id="longitude" placeholder="Longitude" value={this.state.longitude} onChange={this.onChangeLongitude} />
                    </div>
                    <div class="form-group mx-sm-3 mb-2">
                        <label for="ChannelId" class="sr-only">Channel Id</label>
                        <input type="text" class="form-control" id="ChannelId" placeholder="Channel ID" value={this.state.ChannelId} onChange={this.onChangeChannelid} />
                    </div>
                    <div class="form-group mx-sm-3 mb-2">
                        <label for="ChannelKey" class="sr-only">ChannelKey</label>
                        <input type="text" class="form-control" id="ChannelKey" placeholder="Channel Key" value={this.state.ChannelKey} onChange={this.onChangeChannelKey} />
                    </div>
                    <input type="submit" value="Add Sensor" class="btn btn-primary mb-2" />
                </form>
                <div style={{ background: "#FFFFFF" }}>
                    <table className="table table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th>Sensor id</th>
                                <th>latitiude</th>
                                <th>longitude</th>
                                {/* <th>data</th> */}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.allsensors.map((curr, i) => {
                                return (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{curr.latitude}</td>
                                        <td>{curr.longitude}</td>
                                        {/* <td>{curr.data[curr.data.length-1]}</td> */}
                                        <td><button class="btn btn-danger" onClick={() => this.onDelete(curr)}>Delete</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>

        )
    }
}