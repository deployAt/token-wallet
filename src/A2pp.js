import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import * as R from 'ramda'

import './app.css'
import { Nav } from './components/nav'
import { Description } from './components/description'
import { Container } from './components/container/container'
import { AppContext } from './context'
import { TOKENS_20, TOKENS_721 } from './constants'

export const defaultState = {
  inProgress: false,
  network: 'Checking...',
  defaultGasPrice: null,
  defaultGasLimit: 200000,
  tokens20: [],
  mintDetail20: null,
  approveDetail20: null,
  transferDetail20: null,
  tokens721: [],
  mintDetail721: null,
  approveDetail721: null,
  transferDetail721: null,
  fields: {
    receiver: null,
    amount: null,
    metadata: null,
    tokenId: null,
    gasPrice: null,
    gasLimit: null,
  },
  tx20: null,
  tx721: null,
}

export const App = () => {
  const { library, account } = useWeb3React()
  const [appState, setAppState] = useState(defaultState)
  window.appState = appState // DEBUG ON

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
    // const GameNFTDeployed = _GameNFT.networks[networkId]
    // if (GameNFTDeployed) {
    //   const GameNFT = new library.eth.Contract(_GameNFT.abi, GameNFTDeployed.address)
    //   // setContracts((prevState) => ({ ...prevState, [_GameNFT.contractName]: GameNFT }))
    // }

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
        contract: tokenInstance,
      }
    })
    const tokens20 = await Promise.all(tokens20Promise)
    setAppState((prevState) => ({
      ...prevState,
      tokens20,
    }))

    // Load all 721s
    const tokens721Promise = TOKENS_721.map(async (token) => {
      const tokenDeployed = token.networks[networkId]
      const tokenInstance = new library.eth.Contract(token.abi, tokenDeployed.address)
      // setContracts((prevState) => ({ ...prevState, [token.contractName]: tokenInstance }))

      const balance = await tokenInstance.methods.balanceOf(account).call()
      const name = await tokenInstance.methods.name().call()
      const symbol = await tokenInstance.methods.symbol().call()

      const tokenDetailsPromise = R.range(0, Number(balance)).map(async (i) => {
        const tokenOfOwnerByIndex = await tokenInstance.methods.tokenOfOwnerByIndex(account, i).call()
        const tokenURI = await tokenInstance.methods.tokenURI(tokenOfOwnerByIndex).call()
        return { tokenId: tokenOfOwnerByIndex, tokenURI }
      })
      const tokenDetails = await Promise.all(tokenDetailsPromise)

      return {
        balance,
        name,
        symbol,
        address: tokenDeployed.address,
        contract: tokenInstance,
        tokenDetails,
      }
    })
    const tokens721 = await Promise.all(tokens721Promise)

    setAppState((prevState) => ({
      ...prevState,
      tokens721,
    }))
  }

  const clearTx = () => {
    setAppState((prevState) => ({
      ...prevState,
      mintDetail20: null,
      approveDetail20: null,
      transferDetail20: null,
      mintDetail721: null,
      approveDetail721: null,
      transferDetail721: null,
      fields: {},
    }))
  }

  useEffect(() => {
    loadGasPrice()
    loadContracts()
  }, [])

  const globalContext = {
    appState,
    setAppState,
    clearTx,
  }

  return (
    <AppContext.Provider value={globalContext}>
      <Nav />
      <Description />
      <Container />
    </AppContext.Provider>
  )
}
