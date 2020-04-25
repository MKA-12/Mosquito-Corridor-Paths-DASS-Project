import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { Card, Icon, Divider, Badge } from "react-native-elements";
import { WebView } from "react-native-webview";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { BACKEND_CONFIG } from "../core/config";
import FadeInView from "../core/FadeInView";
export default class TargetedMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:
        "Eliminate mosquito breeding grounds in your immediate environment by removing all sources of standing water.",
    };
  }
  componentDidMount() {
    fetch(BACKEND_CONFIG.backendURL + "/api/TargetedMessage/random", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ message: String(res.message) });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <View>
        <GestureRecognizer onSwipeRight={this.props.toggle}>
          <FadeInView>
            <Card
              title={
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {/* <View style={{ flexGrow: 1 }} /> */}
                  <TouchableOpacity
                    style={{ width: 50, height: 50 }}
                    onPress={this.props.toggle}
                  >
                    <Icon name="angle-double-left" type="font-awesome" />
                  </TouchableOpacity>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Educational Message {"\n"}
                  </Text>
                </View>
              }
            >
              <Divider />
              <View style={{ height: 300 }}>
                <ScrollView nestedScrollEnabled={true}>
                  <Text>{"\n"}</Text>
                  <Text>{this.state.message}</Text>
                </ScrollView>
              </View>
            </Card>
          </FadeInView>
        </GestureRecognizer>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Badge
            badgeStyle={{
              marginTop: 10,
              backgroundColor: "black",
              opacity: this.props.showMessage == false ? 1 : 0.5,
            }}
          />
          <Badge
            badgeStyle={{
              marginTop: 10,
              backgroundColor: "black",
              opacity: this.props.showMessage == true ? 1 : 0.5,
            }}
          />
        </View>
      </View>
    );
  }
}
