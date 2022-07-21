import React from 'react'
import { getExclusiveList } from '../../../API/RatesService'
import classes from './MySelect.module.css'

const MySelect = ({ value, onChange, defaultValue, currencyList }) => {
  const optionList = getExclusiveList(currencyList);


  return (


    <select
      className={classes.MySelect}
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option disabled value=''>{defaultValue}</option>
      {optionList.map(optionItem =>
        <option key={optionItem}>{optionItem}</option>
      )}
    </select>
  )
}

export default MySelect
