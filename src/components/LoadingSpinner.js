import React from "react";
import Spinner from 'react-native-loading-spinner-overlay'
import { colors } from "../theme";

export default function LoadingSpinner(props) {
  const { spinner } = props

  return (
    <Spinner
      visible={spinner}
      textStyle={{ color: colors.white }}
      overlayColor="rgba(0,0,0,0.5)"
    />
  )
}