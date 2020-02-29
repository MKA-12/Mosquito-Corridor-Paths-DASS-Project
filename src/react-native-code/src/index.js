import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  SideNavigator
} from "./screens";
import {theme} from './core/theme'
import { Appbar } from 'react-native-paper';

// Initialize Firebase

const Stack = createStackNavigator();

const Header = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
        ? options.title
        : scene.route.name;

  return (
  <Appbar theme={theme}>
      <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
      <Appbar.Content title={title} />
    </Appbar>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SideNavigator"
        headerMode="screen"
        screenOptions={{
          header: ({ scene, previous, navigation }) => (
            <Header scene={scene} previous={previous} navigation={navigation} />
          ),
        }}
      >
        <Stack.Screen
          name="SideNavigator"
          component={SideNavigator}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})