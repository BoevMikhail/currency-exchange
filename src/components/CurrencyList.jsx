import React from 'react'
import CurrencyItem from './CurrencyItem'

const CurrencyList = ({currencyList}) => {
  return (
    <div className='CurrencyList'>
      {currencyList.map((currencyItem, index) =>
        <CurrencyItem key={index} index={index} currencyItem={currencyItem} />
      )}
    </div>
  )
}

export default CurrencyList
