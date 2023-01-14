import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { navigationProps } from './navigationProps/navigationProps'

import Profile from '../../../scenes/profile/Profile'
import EditProfile from '../../../scenes/editProfile/EditProfile'

import GradientHeader from '../../../components/GradientHeader'

const Stack = createStackNavigator()

export const ProfileStacks = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={navigationProps}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          title: 'Profile',
          headerBackground: () => <GradientHeader />,
        })}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Edit',
          headerBackground: () => <GradientHeader />,
        }}
      />
    </Stack.Navigator>
  )
}