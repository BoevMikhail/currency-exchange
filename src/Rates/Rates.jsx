import React, {useContext, useState} from 'react'
import CurrencyList from './List';
import MySelect from '../components/UI/Selects/MySelect';
import {CurrencyListContext} from '../context'

const Rates = () => {
  const {currList, currencyCurrent} = useContext(CurrencyListContext);
  const [currency, setCurrency] = currencyCurrent;

  return (
    <div className='page'>
      <h1 className='page__title'>Rates</h1>
      <MySelect
        description='Base currency:'
        value={currency}
        onChange={value => setCurrency(value)}
        defaultValue='Change currency'
        currencyList={currList}

      />
      <CurrencyList currency={currency} currencyList={currList} />
    </div>
  )
}

export default Rates
