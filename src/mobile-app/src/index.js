import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Clipboard,
  Linking
} from "react-native";
import SOSButton from "./components/SOSButton";
import DiseaseReport from "./components/DiseaseReport";
import TargetedVideo from "./components/TargetedVideo";
import Notification from "./components/Notification"
import { BACKEND_CONFIG } from "./core/config";
import { theme } from "./core/theme";
import { Appbar, Portal, Dialog, Paragraph, Button } from "react-native-paper";
import { Icon } from "react-native-elements";
export default class App extends Component {
  // class MyComponent extends React.Component {
  state = {
    visible: false
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
    Linking.openURL(
      "mailto:"+BACKEND_CONFIG.contactEmail
    );
  };
  render() {
    return (
      <ScrollView>
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
                    justifyContent: "flex-start"
                  }}
                >
                  <Text selectable>Please contact us at : </Text>
                  <TouchableOpacity
                    onPress={() =>
                      // Clipboard.setString("Contact at +91 6969696969")
                      this.openDialScreen()
                    }
                  >
                    <Text style={{ color: "blue" }} color="blue">
                      {/* +91 6969696969 */}
                      {BACKEND_CONFIG.contactNumber}
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <Text>{"\n"}</Text> */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start"
                  }}
                >
                  <Text selectable>Email us at : </Text>
                  <TouchableOpacity
                    onPress={() =>
                      // Clipboard.setString("Contact at +91 6969696969")
                      this.openMailScreen()
                    }
                  >
                    <Text style={{ color: "blue" }} color="blue">
                      {/* +91 6969696969 */}
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
        <TargetedVideo />
        <SOSButton />
        <DiseaseReport />
        {/* <Comp/> */}
        <Notification/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
