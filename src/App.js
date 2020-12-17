import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import _StarToken from './abis/StarToken.json'
import _GameNFT from './abis/GameNFT.json'

export const App = () => {
  const { library } = useWeb3React()
  const [contracts, setContracts] = useState({})

  useEffect(() => {
    loadContracts()
  }, [])

  const loadContracts = async () => {
    const networkId = await library.eth.net.getId()

    // Load StarToken
    const StarTokenDeployed = _StarToken.networks[networkId]
    if (StarTokenDeployed) {
      const StarToken = new library.eth.Contract(_StarToken.abi, StarTokenDeployed.address)
      setContracts((prevState) => ({ ...prevState, [_StarToken.contractName]: StarToken }))

      console.log(await StarToken.methods.name().call())
    }

    // Load GameNFT
    const GameNFTDeployed = _GameNFT.networks[networkId]
    if (GameNFTDeployed) {
      const GameNFT = new library.eth.Contract(_GameNFT.abi, GameNFTDeployed.address)
      setContracts((prevState) => ({ ...prevState, [_GameNFT.contractName]: GameNFT }))
    }
  }

  return (
    <div>
      <h1>{}</h1>
    </div>
  )
}
