import React, { useState, useContext, useEffect } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { colors } from '../theme'

export default function TextInputBox(props) {
  const { 
    secureTextEntry,
    placeholder,
    onChangeText,
    value,
    autoCapitalize,
    keyboardType
  } = props

  return (
    <TextInput
      style={[styles.input, { backgroundColor: colors.grayFifth, color: colors.black }]}
      placeholderTextColor={colors.gray}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      underlineColorAndroid="transparent"
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
})