import React, { useState } from "react";
import { Text, Alert, StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import { BACKEND_CONFIG } from "../core/config";

const SOS = () => {
  const [isDisabled, setButton] = useState({ value: false });
  return (
    <View style={styles.container}>
      <Card title="SOS Report" containerStyle={styles.card}>
        <Text>
          Use the below button to report a mosquito outbreak in your area.{"\n"}
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: 3,
            borderColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            width: 125,
            height: 125,
            backgroundColor: isDisabled.value == true ? "#f7b7b5" : "red",
            borderRadius: 99,
            marginLeft: 140
          }}
          disabled={isDisabled.value}
          onPress={() => {
            SOSReport();
            setButton({
              value: true
            });
            setTimeout(() => {
              setButton({
                value: false
              });
            }, 10000);
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>{"(("}</Text>
            <Icon name="bell" type="font-awesome" />
            <Text>{"))"}</Text>
          </View>
          <Text style={{ color: "white", fontSize: 25 }}>SOS</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default SOS;

async function SOSReport() {
  try {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        const location = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        };
        fetch(BACKEND_CONFIG.backendURL + "/api/SOSReport", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(location)
        });
        Alert.alert("Outbreak Reported!");
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  } catch (err) {
    console.warn(err);
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 0.5,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    // flexDirection: "column",
    // justifyContent: "space-between"
  },
  card: {
    // marginTop: 250,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between"
    // shadowColor: "rgba(0,0,0, .2)",
    // shadowOffset: { height: 0, width: 0 },
    // shadowOpacity: 0, //default is 1
    // shadowRadius: 0, //default is 1
    // borderWidth: 0
  }
});
