import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { navigationProps } from './navigationProps/navigationProps'

import Login from '../../../scenes/login/Login'

const Stack = createStackNavigator()

export const LoginStacks = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={navigationProps}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation }) => ({
          title: 'Login',
        })}
      />
    </Stack.Navigator>
  )
}