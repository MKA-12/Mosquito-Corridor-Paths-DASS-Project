import React, { useState } from "react";
import { Text, Alert, StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import { BACKEND_CONFIG } from "../core/config";

const SOS = () => {
  const [isDisabled, setButton] = useState({ value: false });
  return (
    <View style={styles.container}>
      <Card title="SOS Report">
        <Text>
          Use the below button to report a mosquito outbreak in your area.
          {"\n"}
        </Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={{
              borderWidth: 3,
              borderColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              width: 125,
              height: 125,
              backgroundColor: isDisabled.value == true ? "#f7b7b5" : "red",
              borderRadius: 99
              // marginLeft: 120
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
        </View>
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
        }).then(res => {
          if(res.status === 200){
            Alert.alert("Outbreak Reported!");
          }
          else{
            Alert.alert("Error","Unable to report outbreak. Try Again");
          }
        });
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
  },
  card: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "#fff",
    // alignItems: "center"
  }
});
