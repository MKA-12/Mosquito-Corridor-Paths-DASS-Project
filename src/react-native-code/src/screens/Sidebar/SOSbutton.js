import React from "react";
import { Text, Alert, StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import Background from "../../components/Background";
import NavHeader from "../NavHeader";
import { createStackNavigator } from "@react-navigation/stack";
import { BACKEND_CONFIG } from "../../core/config";
const Stack = createStackNavigator();

const Header = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return <NavHeader navigation={navigation} title={title} />;
};

const SOS = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Card title="SOS Report" containerStyle={styles.card}>
        <Text>
          Use the below button to report a mosquito outbreak in your area.{"\n"}
        </Text>
          <TouchableOpacity
            style={{
              borderWidth: 3,
              borderColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              width: 150,
              height: 150,
              backgroundColor: "red",
              borderRadius: 99,
              marginLeft: 110,
            }}
            onPress={() => {
              SOSReport();
            }}
          >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>{"(("}</Text><Icon name="bell" type="font-awesome" /><Text>{"))"}</Text>
        </View>
          <Text style={{ color: "white" , fontSize: 25}}>SOS</Text>
          </TouchableOpacity>
      </Card>
    </View>
  );
};
const SOSButton = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="SOSButton"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        )
      }}
    >
      <Stack.Screen
        name="SOSButton"
        component={SOS}
        options={{ headerTitle: "SOS Report" }}
      />
    </Stack.Navigator>
  );
};

export default SOSButton;

async function SOSReport() {
  try {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        const location = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        };
        fetch(BACKEND_CONFIG.backendURL + "/api/SOSReport", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(location)
        });
        Alert.alert("Outbreak Reported!");
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  } catch (err) {
    console.warn(err);
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 0.5,
    // backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  card: {
    marginTop: 250,
    // backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "rgba(0,0,0, .2)",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0, //default is 1
    shadowRadius: 0, //default is 1
    borderWidth: 0
  }
});
