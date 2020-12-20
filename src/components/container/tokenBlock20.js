import React, { useContext } from 'react'

import { AppContext } from '../../context'

export const TokenBlock20 = () => {
  const { appState, setAppState } = useContext(AppContext)

  const handleDetail = (type, token) => () => {
    setAppState((prevState) => ({
      ...prevState,
      [type]: token,
    }))
  }

  return (
    <div className="panel-block is-paddingless is-12">
      <div className="column is-12" id="token-lists">
        {appState.tokens20.map((token, index) => {
          return (
            <div key={index} className="columns token">
              <div className="column is-2 has-text-centered">{token.symbol}</div>
              <div className="column is-2 is-size-5 is-ellipsis">{token.name}</div>
              <div className="column is-2 is-size-6 is-ellipsis">{token.balance}</div>
              <div className="column is-1.03 has-text-centered">
                <button className="button is-outlined is-small is-danger">Send</button>
              </div>
              <div className="column is-1.03 has-text-centered">
                <button className="button is-outlined is-small is-danger">Approve</button>
              </div>
              <div className="column is-1.03 has-text-centered">
                <button className="button is-outlined is-small is-danger" onClick={handleDetail('mintDetail20', token)}>
                  Mint
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
