import React, { useState, useContext, useEffect } from "react";
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigator from "../tabs/Tabs";
import Post from "../../../scenes/post/Post";
import { HomeTitleContext } from "../../../contexts/HomeTitleContext";
import { ModalStacks } from "../stacks/ModalStacks";
import { TransitionPresets } from "@react-navigation/stack";
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device';
import { UserContext } from "../../../contexts/UserContext";
import firestore from '@react-native-firebase/firestore';
import { experienceId } from "../../../config";

const Stack = createStackNavigator()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootStack() {
  const { user } = useContext(UserContext)
  const [title, setTitle] = useState('default title')

  useEffect(() => {
    (async () => {
      const isDevice = Device.isDevice
      if(!isDevice) return
      console.log('get push token')
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync({
        experienceId
      });
      await firestore().collection('tokens').doc(user.id).set({
        id: user.id,
        token: token.data,
      })
    })();
  }, [user])

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification.request.content)
    });
    return () => subscription.remove();
  }, []);

  return (
    <HomeTitleContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      <HomeTitleContext.Consumer>
        {(ctx) => (
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen
              name='HomeRoot'
              component={TabNavigator}
            />
            <Stack.Group
              screenOptions={{
                presentation: 'modal',
                headerShown: false,
                gestureEnabled: true,
                cardOverlayEnabled: true,
                ...TransitionPresets.ModalPresentationIOS,
              }}
            >
              <Stack.Screen
                name='ModalStack'
                component={ModalStacks}
                options={{
                  title: ctx.title,
                }}
              />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                presentation: 'modal',
                headerShown: false
              }}
            >
              <Stack.Screen
                name='Post'
                component={Post}
              />
            </Stack.Group>
          </Stack.Navigator>
      )}
      </HomeTitleContext.Consumer>
    </HomeTitleContext.Provider>
  )
}