import React, { Component } from "react";
import axios from "axios";
import ModalTemplate from "./ModalTemplate";
export default class DiseaseReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDisease: [],
    };
  }
  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/diseaseReport")
      .then(res => {
        this.setState({ allDisease: res.data });
        // console.log(this.state.allDisease)
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/diseaseReport")
      .then(res => {
        this.setState({ allDisease: res.data });
        // console.log(this.state.allDisease)
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <ModalTemplate active={true} title="Disease Reports - Area Wise" reset={this.props.reset}>
            <table className="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th>Disease</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {this.state.allDisease.map((curr, i) => {
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
