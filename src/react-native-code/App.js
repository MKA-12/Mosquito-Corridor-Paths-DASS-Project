import React from "react";
import { Provider } from "react-native-paper";
import App from "./src";
import { theme } from "./src/core/theme";
import { StyleSheet, Platform, StatusBar, View } from 'react-native'
import { typography } from "./src/core/typography"

typography()

const Main = () => (
  <Provider theme={theme} >
    <View style={styles.container}>
      <App />
    </View>
  </Provider>
);

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  }
})
