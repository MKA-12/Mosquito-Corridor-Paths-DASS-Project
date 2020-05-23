import React, { Component } from "react";
import axios from "axios";
import ModalTemplate from "./ModalTemplate";
export default class DiseaseReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDisease: [],
      searchtext: "",
      filter: [],
    };
  }
  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/diseaseReport")
      .then((res) => {
        this.setState({ allDisease: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/diseaseReport")
      .then((res) => {
        this.setState({ allDisease: res.data, filter: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onSearch = (event) => {
    this.setState({
      filter: this.state.allDisease,
    });
    this.setState({ searchtext: event.target.value });
    this.setState({
      filter: this.state.allDisease.filter((element) => {
        const diseaseName = element.diseaseName.toLowerCase();
        const Location = element.area.toLowerCase();
        const filter = event.target.value.toLowerCase();
        return diseaseName.includes(filter) || Location.includes(filter);
      }),
    });
  };
  render() {
    return (
      <ModalTemplate
        active={true}
        title="Disease Reports - Area Wise"
        reset={this.props.reset}
        showSubmit={false}
      >
        <table className="table table-striped">
          <thead className="thead-dark">
            <input
              type="text"
              className="form-control mb-4"
              placeholder="Search for Disease / Location"
              value={this.state.searchtext}
              onChange={this.onSearch}
            />
            <tr>
              <th>Disease</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filter.map((curr, i) => {
              return (
                <tr>
                  <td>{curr.diseaseName}</td>
                  <td>{curr.area}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </ModalTemplate>
    );
  }
}
