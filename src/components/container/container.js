import React from 'react'

import { TokenBlock20 } from './tokenBlock20'
import { TokenBlock721 } from './tokenBlock721'

export const Container = () => {
  return (
    <section className="container">
      <div className="columns">
        <div className="is-half column">
          <div className="panel is-multiline">
            <p className="panel-heading has-text-centered is-size-6">ERC20 Tokens</p> <TokenBlock20 />
          </div>
        </div>
        <div className="is-half is-offset-one-half column">
          <div className="panel">
            <p className="panel-heading has-text-centered is-size-6">ERC721 Tokens</p> <TokenBlock721 />
          </div>
        </div>
      </div>
    </section>
  )
}
