import React, { useContext, useState } from 'react'
import CurrencyList from '../components/CurrencyList';
import MySelect from '../components/UI/select/MySelect';
import { CurrencyListContext } from '../context'

const Rates = () => {
  const { currList } = useContext(CurrencyListContext);
  const [currency, setCurrency] = useState("RUB");

  return (
    <div className='Rates page'>
      <h1 className='page__title'>Rates</h1>
      <span className='Rates__SelectTitle'>Base currency:</span>
      <MySelect
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
