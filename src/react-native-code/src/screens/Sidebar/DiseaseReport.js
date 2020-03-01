import React, { useState } from "react";
import { StyleSheet, Text, View, Picker, Alert } from "react-native";
import Background from "../../components/Background";
import NavHeader from "../NavHeader";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Card, DefaultTheme, Paragraph } from "react-native-paper";
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

const DiseaseReportNav = ({ navigation }) => {
  const [disease, setDisease] = useState({ value: "Dengue", error: "" });
  const [area, setArea] = useState({ value: "Bakul Nivas", error: "" });
  async function SubmitDiseaseReport() {
    const report = { diseaseName: disease.value, area: area.value };
    fetch(BACKEND_CONFIG.backendURL + "/api/diseaseReport", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(report)
    }).then(() => {
      Alert.alert("Report Submitted");
    });
  }

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="Report Disease Outbreak" />
        <Card.Content>
          <Paragraph>
            Use this to report any disease outbreaks due to mosquitos in your
            area.
          </Paragraph>
          <Picker
            selectedValue={disease.value}
            onValueChange={(itemValue, itemIndex) => {
              console.log(itemValue);
              setDisease({ value: itemValue });
            }}
            prompt="Choose Disease"
          >
            <Picker.Item label="Dengue" value="Dengue" />
            <Picker.Item label="Chickengunya" value="Chickengunya" />
            <Picker.Item label="Malaria" value="Malaria" />
            <Picker.Item label="Yellow Fever" value="Yellow Fever" />
            <Picker.Item label="Zika Virus" value="Zika Virus" />
          </Picker>
          <Picker
            selectedValue={area.value}
            // style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) =>
              setArea({ value: itemValue })
            }
            prompt="Choose Area"
          >
            <Picker.Item label="Bakul Nivas" value="Bakul Nivas" />
            <Picker.Item label="OBH" value="OBH" />
            <Picker.Item label="Himalaya" value="Himalaya" />
            <Picker.Item label="Vindhya" value="Vindhya" />
            <Picker.Item label="JC" value="JC" />
          </Picker>
        </Card.Content>
        <Card.Actions>
          <Button onPress={SubmitDiseaseReport}>Submit</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const DiseaseReport = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="DiseaseReport"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        )
      }}
    >
      <Stack.Screen
        name="DiseaseReport"
        component={DiseaseReportNav}
        options={{ headerTitle: "DiseaseReport" }}
      />
    </Stack.Navigator>
  );
};

export default DiseaseReport;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
