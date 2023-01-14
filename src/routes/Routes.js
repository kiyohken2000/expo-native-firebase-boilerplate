import React from 'react'
import { useSelector } from 'react-redux'
import Main from './navigation'
import Loading from '../scenes/loading/Loading'

export default function Routes() {
  const { checked, loggedIn } = useSelector((state) => state.app)

  // TODO: switch router by loggedIn state
  console.log('[##] loggedIn', loggedIn)

  // rendering
  if (!checked) {
    return (
      <Loading/>
    )
  }

  return (
    <Main />
  )
}
