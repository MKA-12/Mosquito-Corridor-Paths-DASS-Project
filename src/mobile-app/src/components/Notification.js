import React, { Component } from "react";
import { Text } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { BACKEND_CONFIG } from "../core/config";
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
    token : token
  }
  console.log(
    JSON.stringify({
      token: {
        value: token
      }
    })
  );
  return fetch(BACKEND_CONFIG.backendURL + "/api/Notify", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(TokenObject)
  });
}
export default class Notification extends Component {
  state = {
    notification: {}
  };
  _handleNotification = notification => {
    this.setState({ notification: notification });
  };
  componentDidMount() {
    registerForPushNotificationsAsync();
    Notifications.addListener(this._handleNotification);
  }
  render() {
    return <Text></Text>;
  }
}
