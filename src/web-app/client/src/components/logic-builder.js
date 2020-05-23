import React, { Component } from "react";
import axios from "axios";
import ModalTemplate from "./ModalTemplate";
export default class LogicBuilder extends Component {
  state = {
    tempMin: "",
    tempMax: "",
    humidityMin: "",
    humidityMax: "",
    windMin: "",
    windMax: "",
    error: false,
    success: false,
  };
  onChangeTempMin = (e) => {
    this.setState({
      tempMin: e.target.value,
    });
  };
  onChangeTempMax = (e) => {
    this.setState({
      tempMax: e.target.value,
    });
  };
  onChangeHumidityMin = (e) => {
    this.setState({
      humidityMin: e.target.value,
    });
  };
  onChangeHumidityMax = (e) => {
    this.setState({
      humidityMax: e.target.value,
    });
  };
  onChangeWindMin = (e) => {
    this.setState({
      windMin: e.target.value,
    });
  };
  onChangeWindMax = (e) => {
    this.setState({
      windMax: e.target.value,
    });
  };
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/logic")
      .then((res) => {
        this.setState({
          tempMin: res.data.tempMin,
          tempMax: res.data.tempMax,
          humidityMin: res.data.humidityMin,
          humidityMax: res.data.humidityMax,
          windMin: res.data.windMin,
          windMax: res.data.windMax,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.tempMax === "" ||
      this.state.tempMin === "" ||
      this.state.humidityMax === "" ||
      this.state.humidityMin === "" ||
      this.state.windMax === "" ||
      this.state.windMin === "" ||
      this.state.humidityMax < 0 ||
      this.state.humidityMin < 0 ||
      this.state.windMax < 0 ||
      this.state.windMax < 0 ||
      this.state.humidityMax > 100 ||
      this.state.humidityMin > 100
    ) {
      this.setState({ error: true, success: false });
    } else {
      const logic = {
        tempMax: this.state.tempMax,
        tempMin: this.state.tempMin,
        humidityMax: this.state.humidityMax,
        humidityMin: this.state.humidityMin,
        windMax: this.state.windMax,
        windMin: this.state.windMin,
      };
      axios
        .post("http://localhost:4000/api/logic", logic)
        .then((res) => {
          this.setState({ error: false, success: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  errorprompt = () => {
    return (
      <div style={{ color: "red" }}>
        Enter all fields with valid numbers only
      </div>
    );
  };
  successprompt = () => {
    return (
      <div style={{ color: "green", background: "lightgreen", padding: 5 }}>
        {" "}
        Logic has been changed
      </div>
    );
  };
  render() {
    return (
      <ModalTemplate
        active={true}
        title="Logic Builder"
        reset={this.props.reset}
        onSubmit={this.onSubmit}
      >
        Minimum Temperature:{" "}
        <input
          type="Number"
          className="form-control"
          value={this.state.tempMin}
          onChange={this.onChangeTempMin}
        />
        <br />
        Maximum Temperature:{" "}
        <input
          type="Number"
          className="form-control"
          value={this.state.tempMax}
          onChange={this.onChangeTempMax}
        />
        <br />
        Minimum Humidity:{" "}
        <input
          type="Number"
          className="form-control"
          value={this.state.humidityMin}
          min="0"
          max="100"
          onChange={this.onChangeHumidityMin}
        />
        <br />
        Maximum Humidity:{" "}
        <input
          type="Number"
          className="form-control"
          value={this.state.humidityMax}
          min="0"
          max="100"
          onChange={this.onChangeHumidityMax}
        />
        <br />
        Minimum Wind Speed:{" "}
        <input
          type="Number"
          className="form-control"
          value={this.state.windMin}
          min="0"
          onChange={this.onChangeWindMin}
        />
        <br />
        Maximum Wind Speed:{" "}
        <input
          type="Number"
          className="form-control"
          value={this.state.windMax}
          min="0"
          onChange={this.onChangeWindMax}
        />
        <br />
        {this.state.error && this.errorprompt()}
        {this.state.success && this.successprompt()}
      </ModalTemplate>
    );
  }
}
