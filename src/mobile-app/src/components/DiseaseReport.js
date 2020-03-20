import React, { useState, useRef, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Picker,
  Alert,
  TouchableOpacity
} from "react-native";
import { DefaultTheme, Paragraph } from "react-native-paper";
import { Card, Button } from "react-native-elements";
import { BACKEND_CONFIG } from "../core/config";

const DiseaseReport = () => {
  const [isDisabled, setButton] = useState({ value: false });
  class DiseaseButton extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <TouchableOpacity
          onPress={() => {
            SubmitDiseaseReport(this.props.value);
            setButton({ value: true });
            // setTimeout(() => {
            //     setButton({
            //       value: false
            //     });
            //   }, 10000);
          }}
          style={{
            padding: 15,
            // borderWidth: 1,
            borderRadius: 10,
            backgroundColor: isDisabled.value == false ? "#0a96c9" : "#bed7f7"
          }}
          disabled={isDisabled.value}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            {this.props.value}
          </Text>
        </TouchableOpacity>
      );
    }
  }
  async function SubmitDiseaseReport(place) {
    console.log(place);
    navigator.geolocation.getCurrentPosition(
      position => {
        // console.log(position);
        const location = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        };
        fetch(
          "https://geocode.xyz/" +
            location.latitude +
            "," +
            location.longitude +
            "?geoit=json"
        )
          .then(res => res.json())
          .then(out => {
            fetch(BACKEND_CONFIG.backendURL + "/api/diseaseReport", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                diseaseName: place,
                area: out.staddress + " , " + out.postal + "."
              })
            }).then(() => {
              Alert.alert("Report Submitted");
              setTimeout(() => {
                setButton({
                  value: false
                });
              }, 10000);
            });
          });
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  return (
    <View style={styles.container}>
      <Card title="Report Disease Outbreak">
        {/* <Card.Content> */}
        <Paragraph>
          Use this to report any disease outbreaks due to mosquitos in your
          area.{"\n"}
        </Paragraph>
        {/* <Picker
          selectedValue={disease.value}
          onValueChange={(itemValue, itemIndex) => {
            console.log(itemValue);
            setDisease({ value: itemValue });
          }}
          prompt="Choose Disease"
        >
          <Picker.Item label="Dengue" value="Dengue" />
          <Picker.Item label="Chickengunya" value="Chickengunya" />
          <Picker.Item label="Malaria" value="Malaria" />
          <Picker.Item label="Yellow Fever" value="Yellow Fever" />
          <Picker.Item label="Zika Virus" value="Zika Virus" />
        </Picker>
        <Picker
          selectedValue={area.value}
          // style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => {
            setArea({ value: itemValue });
          }}
          prompt="Choose Area"
        >
          <Picker.Item label="Bakul Nivas" value="Bakul Nivas" />
          <Picker.Item label="OBH" value="OBH" />
          <Picker.Item label="Himalaya" value="Himalaya" />
          <Picker.Item label="Vindhya" value="Vindhya" />
          <Picker.Item label="JC" value="JC" />
        </Picker> */}
        {/* </Card.Content> */}
        {/* <Card.Actions> */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}
        >
          <DiseaseButton value="Malaria" />
          <DiseaseButton value="Zika Virus" />
          <DiseaseButton value="Dengue" />
        </View>
        <Text>{"\n"}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}
        >
          <DiseaseButton value="Chickengunya" />
          <DiseaseButton value="Yellow Fever" />
        </View>
        {/* </Card.Actions> */}
      </Card>
    </View>
  );
};

export default DiseaseReport;

const styles = StyleSheet.create({
  container: {}
});
