import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Sidebar/Home";
import SOSButton from "./Sidebar/SOSbutton";
import DiseaseReport from "./Sidebar/DiseaseReport";
const Drawer = createDrawerNavigator();

const SideNavigator = ({ navigation }) => {
  return (
    <Drawer.Navigator initialRouteName="SOSButton">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ drawerLabel: "Home" }}
      />
      <Drawer.Screen
        name="SOSButton"
        component={SOSButton}
        options={{ drawerLabel: "SOS Report" }}
      />
      <Drawer.Screen
        name="DiseaseReport"
        component={DiseaseReport}
        options={{ drawerLabel: "Disease Report" }}
      />
    </Drawer.Navigator>
  );
};

export default SideNavigator;

const styles = StyleSheet.create({});
