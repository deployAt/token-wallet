import React, { useContext, useState } from 'react'

import { AppContext } from '../../context'

export const TransactionInfo = () => {
  const { appState } = useContext(AppContext)
  const { tx20, tx721 } = appState

  if (tx20 === null && tx721 === null) return null
  return (
    <div className="columns is-centered">
      <div className="column is-10 has-text-centered">
        <div className="notification is-success">
          <button className="delete"></button>
          <p className="is-size-7">
            {tx20 && (
              <>
                TX hash: <strong>{tx20.transactionHash}</strong>{' '}
              </>
            )}
            {tx721 && (
              <>
                TX hash: <strong>{tx721.transactionHash}</strong>{' '}
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
