import React from 'react'
import { useWeb3React } from '@web3-react/core'

export const AddressBar = () => {
  const { account } = useWeb3React()

  return (
    <p className="panel-heading has-text-centered is-clipped is-size-7">
      ETH Account:
      <strong> {account}</strong>
    </p>
  )
}
