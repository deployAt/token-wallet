import React from 'react'
import { useWeb3React } from '@web3-react/core'

export const Nav = () => {
  const { chainId } = useWeb3React()

  return (
    <nav className="navbar is-dark" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <strong>
            <i className="fa fa-coins"></i> Token Wallet
          </strong>
        </a>
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className="navbar-menu is-active">
        <div className="navbar-end">
          <a className="navbar-item">
            <div className="tags has-addons">
              <span className="tag">
                <i className="fa fa-signal"></i> &nbsp; Network
              </span>
              <span className="tag is-info">{chainId}</span>
            </div>
          </a>
        </div>
      </div>
    </nav>
  )
}
