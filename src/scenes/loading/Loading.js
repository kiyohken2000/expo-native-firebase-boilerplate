import React, { useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { authenticate } from 'slices/app.slice'
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { UserContext } from '../../contexts/UserContext';
import { fontSize } from 'theme'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { defaultAvatar } from '../../config';

export default function Loading() {
  const dispatch = useDispatch()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    initialize()
  }, [])

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  const onAuthStateChanged = async(user) => {
    if(user) {
      const { uid, phoneNumber } = user
      const userDocument = await firestore().collection('users').doc(uid).get()
      const isExits = userDocument.exists
      if(isExits) {
        console.log('user exists')
        listenUserData({uid})
      } else {
        console.log('user not exits')
        userRegistration({uid, phoneNumber})
      }
    } else {
      console.log('not login')
      setUser('')
    }
  }

  const userRegistration = async({uid, phoneNumber}) => {
    console.log('userRegistration')
    const res = await firestore().collection('users').doc(uid).set({
      id: uid,
      phone: phoneNumber,
      userName: 'new user',
      avatar: defaultAvatar
    })
    listenUserData({uid})
  }

  const listenUserData = ({uid}) => {
    console.log('listenUserData')
    const subscriber = firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        setUser(documentSnapshot.data())
      });
  }

  const initialize = async() => {
    dispatch(authenticate({ loggedIn: true, checked: true }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Loaging</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: fontSize.xxxLarge,
    fontWeight: '700'
  }
})