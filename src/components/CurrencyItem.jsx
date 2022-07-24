import React from 'react'

const CurrencyItem = ({ currencyItem, rate }) => {
  return (
    <div className='CurrencyItem'>
      <span>{rate}</span><span> {currencyItem}</span>
    </div>
  )
}

export default CurrencyItem
