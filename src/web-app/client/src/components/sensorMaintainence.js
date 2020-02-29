import React, { Component } from "react";
import axios from 'axios';
export default class SensorMaintainence extends Component {
    state = {
        latitude: '',
        longitude: '',
        allsensors: [],
        dummy:'',
    }
    onChangeLatitude = (e) => {
        this.setState({ latitude: e.target.value })
        console.log(e.target.value)
    }
    onChangeLongitude = (e) => {
        this.setState({ longitude: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (Number(this.state.latitude) < 17.448810090060803 && Number(this.state.longitude) > 17.44263033504224 && Number(this.state.longitude) < 78.35107557927012 && Number(this.state.longitude) > 78.34463589731887) {
            const Sensor = {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                data: [],
            }

            axios.post("http://localhost:4000/api/addSensor", Sensor)
                .then(res => {
                    this.setState({ latitude: '', longitude: '' })
                    alert("New Sensor added")
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            alert("enter valid latitiude and longitude")
        }
    }
    onDelete=(curr)=>{
        console.log(curr)
        let route ="http://localhost:4000/api/addSensor/"+curr._id
        axios.delete(route)
        .then(res=>{
            this.setState({dummy:''})
        }).catch(err=>{console.log(err)})
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
                <form class="form-inline" onSubmit={this.onSubmit}>
                    <div class="form-group mx-sm-3 mb-2">
                        <label for="latitude" class="sr-only">Latitude</label>
                        <input type="text" class="form-control" id="latitude" placeholder="Latitude" value={this.state.latitude} onChange={this.onChangeLatitude} />
                    </div>
                    <div class="form-group mx-sm-3 mb-2">
                        <label for="longitude" class="sr-only">Longitude</label>
                        <input type="text" class="form-control" id="longitude" placeholder="Longitude" value={this.state.longitude} onChange={this.onChangeLongitude} />
                    </div>
                    <input type="submit" value="Add Sensor" class="btn btn-primary mb-2" />
                </form>
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
                                    <td>{i+1}</td>
                                    <td>{curr.latitude}</td>
                                    <td>{curr.longitude}</td>
                                    {/* <td>{curr.data[curr.data.length-1]}</td> */}
                                    <td><button class="btn btn-danger" onClick={()=>this.onDelete(curr)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </React.Fragment>

        )
    }
}