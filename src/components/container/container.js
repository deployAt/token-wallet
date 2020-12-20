import React from 'react'

import { AddressBar } from './addressBar'
import { TokenBlock20 } from './tokenBlock20'
import { MintToken } from './mintToken'

export const Container = () => {
  return (
    <section className="container">
      <div className="columns">
        <div className="is-half column">
          <div className="panel is-multiline">
            <AddressBar />
            <TokenBlock20 />
            {/* <MintToken /> */}
          </div>
        </div>
        <div className="is-half is-offset-one-half column">
          <div className="panel"></div>
        </div>
      </div>
    </section>
  )
}
