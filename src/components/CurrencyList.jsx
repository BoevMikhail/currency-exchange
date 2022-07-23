import React from 'react'
import CurrencyItem from './CurrencyItem'

const CurrencyList = ({currency, currencyList}) => {
  return (
    <div className='CurrencyList'>
      {Object.keys(currencyList).map((currencyItem) =>
        currencyList[currencyItem] !== currencyList[currency] &&
        <CurrencyItem key={currencyItem} rate={((1/currencyList[currency]) / (1/currencyList[currencyItem])).toString().slice(0, 10)} currencyItem={currencyItem} />
      )}
    </div>
  )
}

export default CurrencyList
