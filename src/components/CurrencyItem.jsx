import React from 'react'

const CurrencyItem = ({ currencyItem, index }) => {
  return (
    <div className='CurrencyItem'>
      <span>{index}</span><span> {currencyItem}</span>
    </div>
  )
}

export default CurrencyItem
