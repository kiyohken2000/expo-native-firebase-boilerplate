import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import DrawerNavigator from './drawer'

import { UserContext } from '../../contexts/UserContext'

import RootStack from './rootStack/RootStack'
import { LoginStacks } from './stacks/LoginStacks'

import Toast from 'react-native-toast-message'

export default function Navigation() {
  const { user } = useContext(UserContext)
  return (
    <>
    <NavigationContainer>
      {user?
        <RootStack />
        :
        <LoginStacks />
      }
    </NavigationContainer>
    <Toast />
    </>
  )
}