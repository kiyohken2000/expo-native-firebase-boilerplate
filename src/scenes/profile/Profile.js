import React, { useContext, useRef, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Button from '../../components/Button'
import { colors, fontSize } from '../../theme'
import ScreenTemplate from '../../components/ScreenTemplate'
import { UserContext } from '../../contexts/UserContext'
import { Avatar } from 'react-native-elements'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native'
import Dialog from "react-native-dialog"

export default function Profile() {
  const navigation = useNavigation()
  const { user, setUser } = useContext(UserContext)
  const [visible, setVisible] = useState(false)

  const onSignout = async() => {
    console.log('onSignout')
    const res = await auth().signOut()
    console.log(res)
    setUser('')
  }

  const onEditPress = () => {
    navigation.navigate('EditProfile')
  }

  const showDialog = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <>
    <ScreenTemplate>
      <ScrollView style={styles.container}>
        <View style={styles.avatar}>
          <Avatar
            size="xlarge"
            rounded
            title="NI"
            source={{ uri: user.avatar }}
          />
        </View>
        <Text style={styles.field}>Name:</Text>
        <Text style={styles.title}>{user.userName}</Text>
        <Text style={styles.field}>Phone:</Text>
        <Text style={styles.title}>{user.phone}</Text>
        <Button
          label="Edit profile"
          color={colors.lightPurple}
          labelColor={colors.white}
          disable={false}
          onPress={onEditPress}
        />
        <View style={{marginVertical: 10}} />
        <Button
          label="Signing out"
          color={colors.darkPurple}
          labelColor={colors.white}
          disable={false}
          onPress={showDialog}
        />
      </ScrollView>
    </ScreenTemplate>
    <Dialog.Container visible={visible}>
      <Dialog.Title>Sign out</Dialog.Title>
      <Dialog.Description>
        Would you like to sign out?
      </Dialog.Description>
      <Dialog.Button label="Cancel" onPress={handleCancel} />
      <Dialog.Button label="Sign out" onPress={onSignout} />
    </Dialog.Container>
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
  footerView: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20
  },
  footerLink: {
    color: colors.blueLight,
    fontWeight: "bold",
    fontSize: fontSize.large
  },
})
