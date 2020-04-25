import React, { Component } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Card, Icon, Divider, Badge } from "react-native-elements";
import { WebView } from "react-native-webview";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { BACKEND_CONFIG } from "../core/config";
import FadeInView from "../core/FadeInView";
export default class TargetedVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://www.youtube.com/embed/Y1eGOwLVhTc",
    };
  }
  componentDidMount() {
    fetch(BACKEND_CONFIG.backendURL + "/api/TargetedVideo/random", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ url: String(res.url) });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <View>
        <GestureRecognizer onSwipeLeft={this.props.toggle}>
          <FadeInView>
            <Card
              title={
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Educational Video {"\n"}
                  </Text>
                  <View style={{ flexGrow: 1 }} />
                  <TouchableOpacity
                    style={{ width: 50, height: 50 }}
                    onPress={this.props.toggle}
                  >
                    <Icon name="angle-double-right" type="font-awesome" />
                  </TouchableOpacity>
                </View>
              }
            >
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(this.state.url);
                }}
              >
                <View style={{ flex: 1, height: 300 }}>
                  <Divider />
                  <WebView
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: this.state.url }}
                    scalesPageToFit={true}
                    allowsFullscreenVideo
                    scrollEnabled={false}
                    style={{
                      width: 400,
                      height: 300,
                      // marginBottom: 20
                    }}
                  />
                </View>
              </TouchableOpacity>
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
