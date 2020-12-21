import React, { useContext } from 'react'
import { useWeb3React } from '@web3-react/core'

import { AppContext } from '../../context'
import { InputField } from './inputField'

export const ApproveToken = (props) => {
  const { account } = useWeb3React()
  const { appState, setAppState, clearTx } = useContext(AppContext)
  const { approveDetail20, approveDetail721, inProgress, defaultGasPrice, defaultGasLimit, fields } = appState

  const { is721 } = props

  const onApprove = async () => {
    setAppState((prevState) => ({
      ...prevState,
      inProgress: true,
    }))
    const amount = fields.amount
    const receiver = fields.receiver.toString()
    const txResponse = await approveDetail20.contract.methods.approve(receiver, amount).send({ from: account })
    console.log(txResponse)

    setAppState((prevState) => ({
      ...prevState,
      tx20: txResponse,
      inProgress: false,
    }))
  }

  const onApprove721 = async () => {
    setAppState((prevState) => ({
      ...prevState,
      inProgress: true,
    }))
    const tokenId = fields.tokenId
    const receiver = fields.receiver.toString()
    const txResponse = await approveDetail721.contract.methods.approve(receiver, tokenId).send({ from: account })
    console.log(txResponse)

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
          <h1 className="title is-size-5 ">Approve {is721 ? approveDetail721.symbol : approveDetail20.symbol}</h1>
          <h2 className="subtitle is-size-6  has-text-grey-light">
            Approve an Ethereum address to send {is721 ? approveDetail721.symbol : approveDetail20.symbol} from your
            address .
          </h2>
        </div>
      </div>
      <div className="panel-block is-paddingless is-12">
        <div className="column is-12" id="token-lists">
          <InputField name="receiver" placeholder="Receiver Address" />

          {is721 ? (
            <InputField name="tokenId" placeholder="TokenId" />
          ) : (
            <InputField name="amount" placeholder="Amount To Mint" addon={approveDetail20.symbol} />
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
                onClick={is721 ? onApprove721 : onApprove}
              >
                Approve
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
