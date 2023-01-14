import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Linking, TouchableOpacity, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ScreenTemplate from '../../components/ScreenTemplate'
import TextInputBox from '../../components/TextInputBox'
import Button from '../../components/Button'
import { fontSize, colors } from '../../theme'
import auth from '@react-native-firebase/auth';
import { CountryPicker } from "react-native-country-codes-picker";
import LoadingSpinner from '../../components/LoadingSpinner'
import Logo from '../../components/Logo'

const { height, width } = Dimensions.get('window')

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+81');
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    if(confirm) {
      setSpinner(false)
    }
  }, [confirm])

  const signInWithPhoneNumber = async() => {
    setSpinner(true)
    const confirmation = await auth().signInWithPhoneNumber(`${countryCode} ${phoneNumber}`);
    setConfirm(confirmation);
  }

  const confirmCode = async() => {
    try {
      setSpinner(true)
      const res = await confirm.confirm(code);
      const { uid, providerData } = res.user
      const { phoneNumber } = providerData
    } catch (error) {
      console.log('Invalid code.');
    } finally {
      setSpinner(false)
    }
  }

  return (
    <>
    <ScreenTemplate>
      <KeyboardAwareScrollView
        style={styles.main}
        keyboardShouldPersistTaps="always"
      >
        <Logo />
        <View style={styles.buttonContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => setShow(true)}
              style={{
                width: '25%',
                backgroundColor: colors.grayFourth,
                padding: 10,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={{color: 'white', fontSize: 20}}>{countryCode}</Text>
            </TouchableOpacity>
            <CountryPicker
              show={show}
              pickerButtonOnPress={(item) => {
                setCountryCode(item.dial_code);
                setShow(false);
              }}
              style={{
                modal: {
                  height: height * 0.8,
              },
              }}
              onBackdropPress={() => setShow(false)}
            />
            <View style={{flex: 1, paddingLeft: 5}}>
              <TextInputBox
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
                placeholder='input your phone number'
                keyboardType='numeric'
              />
            </View>
          </View>
          <View style={{paddingVertical: 20}} />
          <Button
            label='Phone Number Sign In'
            onPress={() => signInWithPhoneNumber()}
            color={colors.bluePrimary}
            disable={false}
            labelColor={colors.white}
          />
          {confirm?
            <>
            <View style={{paddingVertical: 20}} />
            <TextInputBox
              value={code}
              onChangeText={text => setCode(text)}
              placeholder='input your code here'
              keyboardType='numeric'
            />
            <View style={{paddingVertical: 20}} />
            <Button
              label='Confirm Code'
              onPress={() => confirmCode()}
              color={colors.darkPurple}
              disable={false}
              labelColor={colors.white}
            />
            </>
            :null
          }
        </View>
      </KeyboardAwareScrollView>
    </ScreenTemplate>
    <LoadingSpinner spinner={spinner} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: fontSize.xLarge
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%'
  }
})