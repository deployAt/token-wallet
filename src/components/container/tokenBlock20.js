import React, { useContext } from 'react'

import { AppContext } from '../../context'
import { MintToken } from './mintToken'
import { ApproveToken } from './approveToken'
import { TransferToken } from './transferToken'

export const TokenBlock20 = () => {
  const { appState, setAppState, clearTx } = useContext(AppContext)
  const { mintDetail20, approveDetail20, transferDetail20 } = appState

  const handleDetail = (type, token) => () => {
    if (mintDetail20 || approveDetail20 || transferDetail20) {
      clearTx()
    } else {
      setAppState((prevState) => ({
        ...prevState,
        [type]: token,
      }))
    }
  }

  return (
    <div className="panel-block is-paddingless is-12">
      <div className="column is-12" id="token-lists">
        {appState.tokens20.map((token, index) => {
          return (
            <div key={index}>
              <div className="columns token">
                <div className="column is-2 has-text-centered">{token.symbol}</div>
                <div className="column is-2 is-ellipsis">{token.name}</div>
                <div className="column is-2 is-ellipsis">{token.balance}</div>
                <div className="column has-text-centered">
                  <button
                    className="button is-outlined is-small is-link"
                    onClick={handleDetail('transferDetail20', token)}
                  >
                    Transfer
                  </button>
                </div>
                <div className="column has-text-centered">
                  <button
                    className="button is-outlined is-small is-link"
                    onClick={handleDetail('approveDetail20', token)}
                  >
                    Approve
                  </button>
                </div>
                <div className="column has-text-centered">
                  <button className="button is-outlined is-small is-link" onClick={handleDetail('mintDetail20', token)}>
                    Mint
                  </button>
                </div>
              </div>
              {token === mintDetail20 && <MintToken />}
              {token === approveDetail20 && <ApproveToken />}
              {token === transferDetail20 && <TransferToken />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
