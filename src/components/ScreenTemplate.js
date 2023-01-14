import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, SafeAreaView, StatusBar, View } from "react-native";
import { colors } from "../theme";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import EmptyScreen from "./EmptyScreen";

export default function ScreenTemplate(props) {
  const { isLoading, isError, color, isEmpty } = props

  if(isLoading) {
    return <LoadingScreen />
  }

  if(isError) {
    return <ErrorScreen />
  }

  if(isEmpty) {
    return <EmptyScreen />
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color?color:colors.white}]}>
      <StatusBar barStyle='light-content' />
      <View style={styles.main}>
        {props.children}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluePrimary
  },
  main: {
    flex: 1,
    backgroundColor: colors.white
  }
})