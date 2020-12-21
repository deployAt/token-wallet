import React, { useContext } from 'react'
import { useWeb3React } from '@web3-react/core'

import { AppContext } from '../../context'
import { InputField } from './inputField'

export const MintToken = (props) => {
  const { account } = useWeb3React()
  const { appState, setAppState, clearTx } = useContext(AppContext)
  const { mintDetail20, mintDetail721, inProgress, defaultGasPrice, defaultGasLimit, fields } = appState

  console.log(mintDetail721, mintDetail20)
  const { is721 } = props

  const onMint = async () => {
    setAppState((prevState) => ({
      ...prevState,
      inProgress: true,
    }))
    const amount = fields.amount
    const receiver = fields.receiver.toString()
    const txResponse = await mintDetail20.contract.methods.mint(receiver, amount).send({ from: account })
    console.log(txResponse)

    setAppState((prevState) => ({
      ...prevState,
      tx20: txResponse,
      inProgress: false,
    }))
  }

  const onMint721 = async () => {
    setAppState((prevState) => ({
      ...prevState,
      inProgress: true,
    }))
    const metadata = fields.metadata
    const receiver = fields.receiver.toString()
    const txResponse = await mintDetail721.contract.methods.mint(receiver, metadata).send({ from: account })
    console.log(txResponse)

    setAppState((prevState) => ({
      ...prevState,
      tx721: txResponse,
      inProgress: false,
    }))
  }

  return (
    <div>
      <div className="panel-block">
        <div className="content">
          <h1 className="title is-size-5">Mint {is721 ? mintDetail721.symbol : mintDetail20.symbol}</h1>
          <h2 className="subtitle is-size-6  has-text-grey-light">
            Only send {is721 ? mintDetail721.symbol : mintDetail20.symbol} to an Ethereum address.
          </h2>
        </div>
      </div>
      <div className="panel-block is-paddingless is-12">
        <div className="column is-12" id="token-lists">
          <InputField name="receiver" placeholder="Receiver Address" />

          {is721 ? (
            <InputField name="metadata" placeholder="Metadata" />
          ) : (
            <InputField name="amount" placeholder="Amount To Mint" addon={mintDetail20.symbol} />
          )}

          <InputField
            default={defaultGasPrice}
            name="gasPrice"
            placeholder="Gas Price In Gwei"
            addon="Gas Price(gwei)"
          />
          <InputField default={defaultGasLimit} name="gasLimit" placeholder="Gas Limit" addon="Gas Limit" />

          <div className="field is-grouped is-pulled-right is-offset">
            <p className="control">
              <button className="button is-light" disabled={inProgress} onClick={clearTx}>
                Back
              </button>
            </p>
            <p className="control">
              <button
                className={inProgress ? 'button is-danger is-loading' : 'button is-link'}
                disabled={inProgress}
                onClick={is721 ? onMint721 : onMint}
              >
                Mint
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
