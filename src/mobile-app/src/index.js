import React from "react";
import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";
import SOSButton from "./components/SOSButton";
import DiseaseReport from "./components/DiseaseReport";
import { theme } from "./core/theme";
import { Appbar } from "react-native-paper";

const App = () => {
  return (
    <ScrollView>
        <Appbar theme={theme}>
        <Appbar.Content title={<Text>DASS 45</Text>} style={{alignItems:"center"}} />
        </Appbar>
      <SOSButton />
      <DiseaseReport />
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({});
