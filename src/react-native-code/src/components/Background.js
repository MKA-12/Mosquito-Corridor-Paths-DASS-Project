import React, { memo } from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Background = ({ children }) => (
  <ScrollView style={styles.scrollContainer}>
    <KeyboardAvoidingView style={styles.container} behavior="padding">
    {children}
    </KeyboardAvoidingView>
  </ScrollView>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%"
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  scrollContainer: {
    flexGrow: 1
  }
});

export default memo(Background);
