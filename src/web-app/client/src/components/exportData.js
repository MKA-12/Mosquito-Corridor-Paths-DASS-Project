import React, { Component } from "react";
import axios from 'axios';
import ModalTemplate from "./ModalTemplate"
var moment = require('moment');
export default class ExportData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromDate: '',
            toDate: '',
            InvalidAttributes: false,
            Success: false
        }
        this.objecttoCSV = this.objecttoCSV.bind(this);
        this.download = this.download.bind(this);
        this.getReport = this.getReport.bind(this);
        // this.dateformatting=this.dateformatting.bind(this);
    }

    objecttoCSV(data) {
        const csvrows = [];
        const headers = Object.keys(data[0]);
        csvrows.push(headers.join(','));

        for (const row of data) {
            const values = headers.map(header => {
                const escaped = ('' + row[header]).replace(/"/g, '\\"');
                return `"${escaped}"`;
            });
            csvrows.push(values.join(','));
        }
        return csvrows.join("\n");
    };
    download(data) {
        const blob = new Blob([data], {
            type: 'text/csv'
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'download.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    };
    async getReport(res) {
        const got = await res;
        console.log(got)
        const data = got.data.map(row =>
            ({
                Date: row.date.split('T')[0],
                Time: row.time,
                Longitude: row.coord.lon,
                Latitude: row.coord.lat,
                Weather: row.weather[0].main,
                Temperature: row.main.temp - 273,
                Pressure: row.main.pressure,
                Humidity: row.main.humidity,
                WindSpeed: row.wind.speed
            }));
        if (data.length != 0) {
            const csvdata = this.objecttoCSV(data);
            this.download(csvdata);
            console.log(data)
        }
    };

    onChangeFromDate = (e) => {
        this.setState({ fromDate: e.target.value })
    }
    onChangeToDate = (e) => {
        this.setState({ toDate: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state.fromDate,this.state.toDate);
        if (moment(this.state.fromDate, "YYYY-MM-DD", true).isValid() && moment(this.state.toDate, "YYYY-MM-DD", true).isValid()) {
            const DataAttr = {
                fromDate: this.state.fromDate,
                toDate: new Date(new Date(this.state.toDate).getTime() + 24 * 60 * 60 * 1000).toISOString()
            }
            console.log(DataAttr)
            axios.put("http://localhost:4000/api/macroWeatherData", DataAttr)
                .then(res => {
                    this.setState({ fromDate: '', toDate: '' })
                    this.getReport(res);
                    console.log(res);
                    // alert("Data Got Exported")
                    this.setState({ Success: true })
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            // alert("Enter the attributes required");
            this.setState({ InvalidAttributes: true })
        }
    }
    InvalidAttributesPrompt = () => {
        return (
            <div style={{ color: 'red' }}>       Enter the attributes required</div>
        )
    }
    successprompt = () => {
        return (
            <div style={{ color: 'green', background: 'lightgreen', padding: 0 }}>Data Got Exported</div>
        )
    }
    render() {
        return (
            <ModalTemplate active={true} title="Export Data" reset={this.props.reset} onSubmit={this.onSubmit}>
                <br />
                <form class="form-inline" onSubmit={this.onSubmit}>
                    <div class="form-group mx-sm-3 mb-2">
                        <label for="fromDate" class="sr-only">FromDate</label>
                        <input type="date" class="form-control" id="fromDate" placeholder="fromDate" value={this.state.fromDate} onChange={this.onChangeFromDate} />
                    </div>
                    <div class="form-group mx-sm-3 mb-2">
                        <label for="toDate" class="sr-only">ToDate</label>
                        <input type="date" class="form-control" id="toDate" placeholder="toDate" value={this.state.toDate} onChange={this.onChangeToDate} />
                    </div>
                    {/* <input type="submit" value="Export Data" class="btn btn-primary mb-2" /> */}
                </form>
                {this.state.InvalidAttributes && this.InvalidAttributesPrompt()}
                {this.state.Success && this.successprompt()}
            </ModalTemplate>
        )
    }
}