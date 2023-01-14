import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import TextInputBox from '../../components/TextInputBox'
import { Avatar } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { useNavigation } from '@react-navigation/native'
import { colors, fontSize } from '../../theme'
import { UserContext } from '../../contexts/UserContext'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import LoadingSpinner from '../../components/LoadingSpinner'

export default function EditProfile() {
  const { user } = useContext(UserContext)
  const navigation = useNavigation()
  const [userName, setUserName] = useState(user.userName)
  const [avatar, setAvatar] = useState(user.avatar)
  const [spinner, setSpinner] = useState(false)

  const profileUpdate = async() => {
    try {
      await firestore().collection('users').doc(user.id).update({
        id: user.id,
        phone: user.phone,
        userName: userName,
        avatar: avatar,
      })
      navigation.goBack()
    } catch(e) {
      alert(e)
    }
  }

  const ImageChoiceAndUpload = async () => {
    try {
      if (Platform.OS === 'ios') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert("Permission is required for use.");
          return;
        }
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      setSpinner(true)
      if (!result.canceled) {
        let actions = [];
        actions.push({ resize: { width: 300 } });
        const manipulatorResult = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          actions,
          {
            compress: 0.4,
          },
        );
        const filename = manipulatorResult.uri.substring(manipulatorResult.uri.lastIndexOf('/') + 1);
        const storageRef = storage().ref(`avatar/${user.id}/` + filename);
        await storageRef.putFile(manipulatorResult.uri);
        const url = await storageRef.getDownloadURL();
        setAvatar(url)
      }
    } catch (e) {
      console.log('error',e.message);
      alert("The size may be too much.");
    } finally {
      setSpinner(false)
    }
  }

  return (
    <>
    <ScreenTemplate>
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.avatar}>
          <Avatar
            size="xlarge"
            rounded
            title="NI"
            onPress={ImageChoiceAndUpload}
            source={{ uri: avatar }}
          />
        </View>
        <Text style={styles.field}>Name:</Text>
        <TextInputBox
          placeholder={userName}
          onChangeText={(text) => setUserName(text)}
          value={userName}
          autoCapitalize="none"
        />
        <View style={{marginVertical: 10}} />
        <Button
          label='Update'
          color={colors.bluePrimary}
          onPress={profileUpdate}
          disable={!userName}
          labelColor={colors.white}
        />
      </KeyboardAwareScrollView>
    </ScreenTemplate>
    <LoadingSpinner spinner={spinner} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: fontSize.xxxLarge,
    marginBottom: 20,
    textAlign: 'center'
  },
  field: {
    fontSize: fontSize.middle,
    textAlign: 'center',
  },
  avatar: {
    margin: 30,
    alignSelf: "center",
  },
})