import React, { useContext } from 'react'
import { useWeb3React } from '@web3-react/core'

import { AppContext } from '../../context'

export const AddressBar = () => {
  const { account } = useWeb3React()
  const myContext = useContext(AppContext)
  const tx = null

  return (
    <p className={tx ? 'is-hidden' : 'panel-heading has-text-centered is-clipped is-size-7'}>
      ETH Account:
      <strong>{account}</strong>
    </p>
  )
}
