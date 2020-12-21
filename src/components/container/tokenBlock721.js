import React, { useContext, useState } from 'react'

import { AppContext } from '../../context'
import { MintToken } from './mintToken'
import { ApproveToken } from './approveToken'
import { TransferToken } from './transferToken'

export const TokenBlock721 = () => {
  const { appState, setAppState, clearTx } = useContext(AppContext)
  const { mintDetail20, approveDetail20, transferDetail20 } = appState

  const [detail721, setDetail721] = useState(null)

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
  console.log('detail721', detail721)

  const toggleDetail = (index) => () => {
    if (detail721 || detail721 === 0) {
      setDetail721(null)
    } else {
      setDetail721(index)
    }
  }

  return (
    <div className="panel-block is-paddingless is-12">
      <div className="column is-12" id="token-lists">
        {appState.tokens721.map((token, index) => {
          return (
            <div key={index}>
              <div className="columns">
                <div className="column is-2 has-text-centered">{token.symbol}</div>
                <div className="column is-2">{token.name}</div>
                <div className="column is-0">{token.balance}</div>

                <div className="column has-text-centered">
                  <button className="button is-outlined is-small is-link" onClick={toggleDetail(index)}>
                    Details
                  </button>
                </div>

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
              {index === detail721 && <Detail721 tokenDetails={token.tokenDetails} />}
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

const Detail721 = ({ tokenDetails }) => {
  return (
    <table className="table is-striped is-hoverable is-fullwidth mb-5">
      <thead>
        <tr>
          <th>
            <span className="has-text-link-dark">ID</span>
          </th>
          <th>
            <span className="has-text-link-dark">URI</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {tokenDetails.map((tokenD, i) => (
          <tr key={i}>
            <th>{tokenD.tokenId}</th>
            <th>{tokenD.tokenURI}</th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
