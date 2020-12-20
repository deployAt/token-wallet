import React, { useContext } from 'react'
import { useWeb3React } from '@web3-react/core'

import { AppContext } from '../../context'
import { InputField } from './inputField'

export const TransferToken = () => {
  const { account } = useWeb3React()
  const { appState, setAppState, clearTx } = useContext(AppContext)
  const { transferDetail20, inProgress, defaultGasPrice, defaultGasLimit, fields } = appState

  const onTransfer = async () => {
    setAppState((prevState) => ({
      ...prevState,
      inProgress: true,
    }))
    const amount = fields.amount
    const receiver = fields.receiver.toString()
    let txResponse = null

    try {
      txResponse = await transferDetail20.contract.methods.transfer(receiver, amount).send({ from: account })
      console.log(txResponse)
    } catch (error) {
      console.error(error)
    }

    setAppState((prevState) => ({
      ...prevState,
      tx20: txResponse,
      inProgress: false,
    }))
  }

  return (
    <div>
      <div className="panel-block">
        <div className="content">
          <h1 className="title is-size-5 ">Transfer {transferDetail20.symbol}</h1>
          <h2 className="subtitle is-size-6  has-text-grey-light">
            Only transfer {transferDetail20.symbol} to an Ethereum address.
          </h2>
        </div>
      </div>
      <div className="panel-block is-paddingless is-12">
        <div className="column is-12" id="token-lists">
          <InputField name="receiver" placeholder="Receiver Address" />
          <InputField name="amount" placeholder="Amount To Transfer" addon={transferDetail20.symbol} />
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
                onClick={onTransfer}
              >
                Transfer
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
