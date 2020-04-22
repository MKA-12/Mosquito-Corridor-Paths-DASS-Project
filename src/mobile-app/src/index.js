import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import SOSButton from "./components/SOSButton";
import DiseaseReport from "./components/DiseaseReport";
import TargetedVideo from "./components/TargetedVideo";
import TargetedMessage from "./components/TargetedMessage";
import Notification from "./components/Notification";
import { BACKEND_CONFIG } from "./core/config";
import { theme } from "./core/theme";
import { Appbar, Portal, Dialog, Button } from "react-native-paper";
export default class App extends Component {
  state = {
    visible: false,
    showMessage: false,
  };
  toggle = () => {
    this.setState({
      showMessage: !this.state.showMessage,
    });
  };
  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  openDialScreen = () => {
    let number = "";
    if (Platform.OS === "ios") {
      number = "telprompt:" + BACKEND_CONFIG.contactNumber;
    } else {
      number = "tel:" + BACKEND_CONFIG.contactNumber;
    }
    Linking.openURL(number);
  };
  openMailScreen = () => {
    Linking.openURL("mailto:" + BACKEND_CONFIG.contactEmail);
  };
  render() {
    return (
      <ScrollView nestedScrollEnabled={true}>
        <Appbar theme={theme}>
          <Appbar.Content
            title={<Text>DASS 45</Text>}
            style={{ alignItems: "center" }}
          />
          <Appbar.Action
            icon="information"
            onPress={() => {
              this._showDialog();
            }}
          ></Appbar.Action>
        </Appbar>
        <View>
          <Portal>
            <Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
              <Dialog.Title>Contact Us</Dialog.Title>
              <Dialog.Content>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <Text selectable>Please contact us at : </Text>
                  <TouchableOpacity onPress={() => this.openDialScreen()}>
                    <Text style={{ color: "blue" }} color="blue">
                      {BACKEND_CONFIG.contactNumber}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <Text selectable>Email us at : </Text>
                  <TouchableOpacity onPress={() => this.openMailScreen()}>
                    <Text style={{ color: "blue" }} color="blue">
                      {BACKEND_CONFIG.contactEmail}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={this._hideDialog}>Ok</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
        {this.state.showMessage ? (
          <TargetedMessage
            toggle={this.toggle}
            showMessage={this.state.showMessage}
          />
        ) : (
          <TargetedVideo
            toggle={this.toggle}
            showMessage={this.state.showMessage}
          />
        )}
        <SOSButton />
        <DiseaseReport />
        <Notification />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
