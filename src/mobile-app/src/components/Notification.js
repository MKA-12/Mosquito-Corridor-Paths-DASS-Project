import React, { Component } from "react";
import { Text } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { BACKEND_CONFIG } from "../core/config";
var globalToken = "";
async function registerForPushNotificationsAsync() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = status;
  if (status !== "granted") {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    return;
  }
  let token = await Notifications.getExpoPushTokenAsync();
  const TokenObject = {
    token: token,
  };
  globalToken = token;
  console.log(
    JSON.stringify({
      token: {
        value: token,
      },
    })
  );
  return fetch(BACKEND_CONFIG.backendURL + "/api/Notify", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(TokenObject),
  });
}
async function sendlocation() {
  var permissionLocation = await Location.hasServicesEnabledAsync();
  if (permissionLocation === true) {
    var location = await Location.getLastKnownPositionAsync();
    const locationObject = {
      token: globalToken,
      location: {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      },
    };
    console.log(locationObject)
    return fetch(BACKEND_CONFIG.backendURL + "/api/Notify/reportLocation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(locationObject),
    });
  }
}
export default class Notification extends Component {
  state = {
    notification: {},
  };
  _handleNotification = (notification) => {
    this.setState({ notification: notification });
  };
  componentDidMount() {
    registerForPushNotificationsAsync();
    Notifications.addListener(this._handleNotification);
    setInterval(()=>{sendlocation()}, 60000);
    // this.sendlocation()
  }
  render() {
    return <Text></Text>;
  }
}
