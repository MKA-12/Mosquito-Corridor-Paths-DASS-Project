import React from 'react'
import { View, Text } from 'react-native'
import { Appbar } from 'react-native-paper';
import {theme} from '../core/theme'

const NavHeader = ({navigation, title}) => {
  return (
    <Appbar theme={theme}>
      <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
      <Appbar.Content title={title} />
    </Appbar>
  )
}

export default NavHeader