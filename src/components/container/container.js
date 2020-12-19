import React from 'react'

import { AddressBar } from './addressBar'
import { TokenBlock20 } from './tokenBlock20'

import { TransferHeader } from './transferHeader'

export const Container = () => {
  const account = 'test'
  const tx20 = null

  return (
    <section className="container">
      <div className="columns">
        <div className="is-half column">
          <div className="panel is-multiline">
            <AddressBar account={account} tx={tx20} />
            <TokenBlock20 />
          </div>
        </div>
        <div className="is-half is-offset-one-half column">
          <div className="panel"></div>
        </div>
      </div>
    </section>
  )
}
