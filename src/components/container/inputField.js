import React, { useContext } from 'react'

import { AppContext } from '../../context'

export const InputField = (props) => {
  const { appState, setAppState } = useContext(AppContext)
  const { fields } = appState

  const field = props.name
  const value = fields[field] ? fields[field] : ''
  const placeholder = props.placeholder
  const addon = props.addon

  const handleOnChange = (e) => {
    e.persist()
    return setAppState((prevState) => ({
      ...prevState,
      fields: { ...prevState.fields, [field]: e.target.value },
    }))
  }

  return (
    <div className="field has-addons is-12">
      <p className="control is-expanded">
        <input
          defaultValue={props.default || value}
          onInput={handleOnChange}
          placeholder={placeholder}
          className="input"
          type="text"
        ></input>
      </p>
      <p className="control">{addon ? <a className="button is-static">{addon}</a> : ''}</p>
    </div>
  )
}
