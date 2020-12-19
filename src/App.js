import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import './app.css'
import _StarToken from './abis/StarToken.json'
import _GameNFT from './abis/GameNFT.json'
import { Nav } from './components/nav'
import { Description } from './components/description'
import { Container } from './components/container/container'
import { AppContext } from './context'
import { TOKENS_20 } from './constants'

export const defaultState = {
  network: 'Checking...',
  defaultGasPrice: null,
  defaultGasLimit: 200000,
  tokens20: [],
}

export const App = () => {
  const { library, account } = useWeb3React()

  const [appState, setAppState] = useState(defaultState)
  const [contracts, setContracts] = useState({})
  // console.log('state', appState)
  const globalContext = {
    appState,
    setAppState,
    contracts,
  }

  const loadGasPrice = () => {
    library.eth.getGasPrice((err, price) => {
      const gasprice = library.utils.fromWei(price, 'gwei')
      if (!err)
        setAppState((prevState) => ({
          ...prevState,
          defaultGasPrice: gasprice,
        }))
    })
  }

  const loadContracts = async () => {
    const networkId = await library.eth.net.getId()

    // Load StarToken
    // const StarTokenDeployed = _StarToken.networks[networkId]
    // if (StarTokenDeployed) {
    //   const StarToken = new library.eth.Contract(_StarToken.abi, StarTokenDeployed.address)
    //   setContracts((prevState) => ({ ...prevState, [_StarToken.contractName]: StarToken }))

    //   console.log(await StarToken.methods.name().call())
    // }

    // Load GameNFT
    const GameNFTDeployed = _GameNFT.networks[networkId]
    if (GameNFTDeployed) {
      const GameNFT = new library.eth.Contract(_GameNFT.abi, GameNFTDeployed.address)
      setContracts((prevState) => ({ ...prevState, [_GameNFT.contractName]: GameNFT }))
    }

    // Load all 20s
    const tokens20Promise = TOKENS_20.map(async (token) => {
      const tokenDeployed = token.networks[networkId]

      const tokenInstance = new library.eth.Contract(token.abi, tokenDeployed.address)
      // setContracts((prevState) => ({ ...prevState, [token.contractName]: tokenInstance }))

      // console.log(await tokenInstance.methods.name().call())
      let balance = await tokenInstance.methods.balanceOf(account).call()
      let name = await tokenInstance.methods.name().call()
      let symbol = await tokenInstance.methods.symbol().call()
      let decimals = await tokenInstance.methods.decimals().call()

      return {
        decimals,
        balance,
        name,
        symbol,
        address: tokenDeployed.address,
      }
    })

    const tokens20 = await Promise.all(tokens20Promise)

    setAppState((prevState) => ({
      ...prevState,
      tokens20,
    }))
  }

  useEffect(() => {
    loadGasPrice()
    loadContracts()
  }, [])

  return (
    <AppContext.Provider value={globalContext}>
      <Nav />
      <Description />
      <Container />
    </AppContext.Provider>
  )
}
