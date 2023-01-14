import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { navigationProps } from './navigationProps/navigationProps'

import Home from '../../../scenes/home/Home'
import Details from '../../../scenes/details/Details'
import Menu from '../../../scenes/menu/Menu'

const Stack = createStackNavigator()

export const HomeStacks = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={navigationProps}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: 'Home',
          headerShown: false,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={({ navigation }) => ({
          title: 'Details',
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={({ navigation }) => ({
            title: 'Menu',
            headerBackTitleVisible: false,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}