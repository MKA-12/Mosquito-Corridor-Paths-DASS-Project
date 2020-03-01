import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Background from '../../components/Background'
import NavHeader from '../NavHeader'
import { createStackNavigator } from '@react-navigation/stack';

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
    <NavHeader navigation={navigation} title={title} />
  );
};

const HomeNav = ({ navigation }) => {
  return (
    <Background>
        <Text>Welcome to Mosquito Outbreak Report System.</Text>
    </Background>
  )
}

const Home = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeNav}
        options={{ headerTitle: 'Home' }}
      />
    </Stack.Navigator>
  )
}

export default Home