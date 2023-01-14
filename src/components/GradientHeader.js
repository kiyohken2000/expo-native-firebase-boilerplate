import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function GradientHeader() {
  return (
    <LinearGradient
      colors={['#1B2F4F', '#4A5B92']}
      style={{ flex: 1 }}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
    />
  )
}