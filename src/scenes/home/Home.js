import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import Button from '../../components/Button'
import { colors, fontSize } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../contexts/UserContext'
import ScreenTemplate from '../../components/ScreenTemplate'
import { showToast } from '../../utils/showToast'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { sendNotification } from '../../utils/SendNotification'

export default function Home() {
  const navigation = useNavigation()
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    //console.log('user:', user)
  }, [user])

  useEffect(() => {
    const fetchData = async() => {
      const querySnapshot = await firestore().collection('test').get();
      const items = querySnapshot.docs.map((doc) => doc.data())
      //console.log(items)
    }
    fetchData()
  }, [])

  const onToastPress = () => {
    showToast({title: 'Hello', body: 'React Native Developer'})
  }

  const onNotificationPress = async() => {
    const res = await sendNotification({
      title: 'Hello',
      body: 'This is some something 👋',
      data: 'something data',
      id: user.id
    })
    if(!res) {
      showAlert()
    }
  }

  const showAlert = () => {Alert.alert(
    'Error',
    'Could not send notification.',
    [
      {text: 'Close', onPress: () => console.log('close')},
    ],
    { cancelable: false }
  )
  }
  
  return (
    <ScreenTemplate>
      <View style={styles.root}>
        <Text style={styles.title}>Home</Text>
        <View style={styles.textContainer}>
          <Text>ヘッダーなしボトムタブあり</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            label="Go to Details"
            color={colors.darkPurple}
            disable={false}
            labelColor={colors.white}
            onPress={() => {
              navigation.navigate('Details', { from: 'Home' })
            }}
          />
          <View style={{marginVertical: 10}} />
          <Button
            label="Go to Modal"
            color={colors.bluePrimary}
            labelColor={colors.white}
            disable={false}
            onPress={() => {
              navigation.navigate('ModalStack', {
                screen: 'Modal',
                params: {from: 'Home'}
              })
            }}
          />
          <View style={{marginVertical: 10}} />
          <Button
            label="Go to Modal"
            color={colors.lightPurple}
            labelColor={colors.white}
            disable={false}
            onPress={() => {
              navigation.navigate('Post')
            }}
          />
          <View style={{marginVertical: 10}} />
          <Button
            label="Go to Modal"
            color={colors.lightPurple}
            labelColor={colors.white}
            disable={false}
            onPress={() => {
              navigation.navigate('Menu')
            }}
          />
          <View style={{marginVertical: 10}} />
          <Button
            label="Show Toast"
            color={colors.lightPurple}
            labelColor={colors.white}
            disable={false}
            onPress={onToastPress}
          />
          <View style={{marginVertical: 10}} />
          <Button
            label="Send Notification"
            color={colors.lightPurple}
            labelColor={colors.white}
            disable={false}
            onPress={onNotificationPress}
          />
        </View>
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.xxxLarge,
    marginBottom: 20,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 10
  }
})
