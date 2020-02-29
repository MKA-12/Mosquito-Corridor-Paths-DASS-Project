import React from "react";
import { Text, Alert } from "react-native";
import { Button } from "react-native-elements";
import Background from "../../components/Background";
import NavHeader from "../NavHeader";
import { createStackNavigator } from "@react-navigation/stack";
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
    <Background>
      <Text>
        Use the below button to report a mosquito outbreak in your area.{"\n"}
      </Text>
      <Button
        // backgroundColor={'red'}
        buttonStyle={{
          backgroundColor: "red"
        }}
        icon={{
          name: "bell",
          type: "font-awesome"
        }}
        title="SOS Button"
        onPress={() => {
          SOSReport();
        }}
      ></Button>
    </Background>
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
        fetch('http://10.42.0.122:4000/api/SOSReport', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(location),
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
