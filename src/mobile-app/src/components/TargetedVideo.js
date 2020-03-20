import React, { Component } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Card, Icon, Divider } from "react-native-elements";
import { WebView } from "react-native-webview";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";

export default class TargetedVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: false
    };
  }
  render() {
    return (
      // <View>
      this.state.message == false ? (
        <GestureRecognizer
          onSwipeLeft={() => {
            this.setState({ message: true });
          }}
        >
          <Card
            title={
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Educational Video {"\n"}
                </Text>
                <View style={{ flexGrow: 1 }} />
                <TouchableOpacity
                  style={{ width: 50, height: 50 }}
                  onPress={() => {
                    this.setState({ message: true });
                  }}
                >
                  <Icon name="angle-double-right" type="font-awesome" />
                </TouchableOpacity>
              </View>
            }
          >
              <TouchableOpacity onPress={()=>{
              Linking.openURL("https://www.youtube.com/embed/Y1eGOwLVhTc")
            }}>
            <View style={{ flex: 1, height: 300 }}>
              <Divider />
              <WebView
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: "https://www.youtube.com/embed/Y1eGOwLVhTc" }}
                scalesPageToFit={true}
                allowsFullscreenVideo
                scrollEnabled={false}
                style={{
                  width: 400,
                  height: 100
                  // marginBottom: 20
                }}
              />
            </View>
              </TouchableOpacity>
          </Card>
        </GestureRecognizer>
      ) : (
        <GestureRecognizer
          onSwipeRight={() => {
            this.setState({ message: false });
          }}
        >
          <Card
            title={
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                {/* <View style={{ flexGrow: 1 }} /> */}
                <TouchableOpacity
                  style={{ width: 50, height: 50 }}
                  onPress={() => {
                    this.setState({ message: false });
                  }}
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
            <View style={{ flex: 1 }}>
              <Text>{"\n"}</Text>
              <Text>Hello there fdafdf fdsf dsf dsfds fdsffds</Text>
            </View>
          </Card>
        </GestureRecognizer>
      )
      // </View>
    );
  }
}
