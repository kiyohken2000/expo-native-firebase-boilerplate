import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import DrawerNavigator from './drawer'
import RootStack from './rootStack/RootStack'
import Toast from 'react-native-toast-message'

export default () => {
  return (
    <>
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
    <Toast />
    </>
  )
}
