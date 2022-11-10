import React, { FunctionComponent, useState } from "react"
import { Check } from "../../../types/check"
import './CheckItem.css'

const CheckItem: FunctionComponent<Check> = ({
  id,
  description,
  enabled,
  onSelectAnswer
}) => {

  const [optionSelected, setOptionSelected] = useState('')

  return (
    <div className={`container ${enabled ? '' : 'disabled'}`} tabIndex={0}>
      <h3>
        {description}
      </h3>
      <div className="checkboxContainer">
        <div
          id={`${id.toString()}-yes`} 
          className={`checkboxItem ${optionSelected === 'yes' ? 'checkboxItemEnabled disableHover' : ''}`} 
          onClick={() => {
            setOptionSelected('yes')
            onSelectAnswer?.(id, true)
          }}
          tabIndex={0}
        >
          Yes
        </div>
        <div
          id={`${id.toString()}-no`}
          className={`checkboxItem checkboxItemRight ${optionSelected === 'no' ? 'checkboxItemEnabled disableHover' : ''}`}
          onClick={() => {
            setOptionSelected('no')
            onSelectAnswer?.(id, false)
          }}
          tabIndex={0}
        >
          No
        </div>
      </div>
    </div>
  )
}



export default CheckItem