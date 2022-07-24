import React, { useContext } from 'react'
import { CurrencyListContext } from '../context'
import CurrencyItem from './CurrencyItem'

const CurrencyList = ({ currency, currencyList }) => {
  const { isCurrenciesLoading } = useContext(CurrencyListContext);


  return (
    <div>
      <div className='CurrencyList'>
        {isCurrenciesLoading && <div style={{gridColumn: '1/4'}}>Currencies is loading...</div>}
        {Object.keys(currencyList).map((currencyItem) =>
          currencyList[currencyItem] !== currencyList[currency] &&
          <CurrencyItem key={currencyItem} rate={((1 / currencyList[currency]) / (1 / currencyList[currencyItem])).toString().slice(0, 10)} currencyItem={currencyItem} />
        )}
      </div>
    </div>
  )
}

export default CurrencyList
