import React, { Component } from "react";
import axios from 'axios';
import {
    Modal,
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from "reactstrap";  
import { MdClose } from "react-icons/md";
var moment = require('moment');
export default class ExportData extends Component {
    constructor(props){
        super(props);
        this.state = {
            fromDate: '',
            toDate: '',
            active: this.props.active
        }
        this.objecttoCSV=this.objecttoCSV.bind(this);
        this.download=this.download.bind(this);
        this.getReport=this.getReport.bind(this);
    }
    toggle = () => {
        this.setState({active:!this.state.active})
        setTimeout(() => {
          this.props.reset();
        }, 1000);
      };
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
    
        const data = got.data.map(row =>
            ({
                id: row._id,
                dt: row.dt
            }));
        if(data.length!=0){
        const csvdata = this.objecttoCSV(data);
        this.download(csvdata);
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
        if(moment(this.state.fromDate, "DD/M/YYYY", true).isValid() && moment(this.state.toDate, "DD/M/YYYY", true).isValid()){
        const DataAttr = {
            fromDate: this.state.fromDate,
            toDate: this.state.toDate
        }
        axios.put("http://localhost:4000/api/macroWeatherData", DataAttr)
            .then(res => {
                this.setState({ fromDate: '', toDate: '' })
                this.getReport(res);
                console.log(res);
                alert("Data Got Exported")
            })
            .catch(err => {
                console.log(err)
            })  
        }
        else{
            alert("Enter the attributes required");
        }     
    }
    render() {
        const closeButton = (
            <MdClose
              onClick={this.toggle}
              style={{ backgroundColor: "red", borderRadius: 50, cursor: "pointer" }}
            />
        );
        return (
            <Modal isOpen={this.state.active} toggle={this.toggle} className={this.props.className}>
                <ModalHeader
                toggle={this.toggle}
                close={closeButton}
                style={{ backgroundColor: "black", color: "white" }}>
                Export Data
                </ModalHeader>
                <ModalBody>
                <React.Fragment>
                    <br />
                    <form class="form-inline" onSubmit={this.onSubmit}>
                        <div class="form-group mx-sm-3 mb-2">
                            <label for="fromDate" class="sr-only">FromDate</label>
                            <input type="text" class="form-control" id="fromDate" placeholder="fromDate" value={this.state.fromDate} onChange={this.onChangeFromDate} />
                        </div>
                        <div class="form-group mx-sm-3 mb-2">
                            <label for="toDate" class="sr-only">ToDate</label>
                            <input type="text" class="form-control" id="toDate" placeholder="toDate" value={this.state.toDate} onChange={this.onChangeToDate} />
                        </div>
                        {/* <input type="submit" value="Export Data" class="btn btn-primary mb-2" /> */}
                    </form>
                    </React.Fragment>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onSubmit}>
                        Submit
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}