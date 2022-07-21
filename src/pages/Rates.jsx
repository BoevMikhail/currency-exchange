import React, { useContext, useEffect, useState } from 'react'
import { getList } from '../API/RatesService';
import CurrencyList from '../components/CurrencyList';
import MySelect from '../components/UI/select/MySelect';
import { CurrencyListContext } from '../context'

const Rates = () => {
  const { currList } = useContext(CurrencyListContext);
  const [currency, setCurrency] = useState("RUB");
  const [currencyList, setCurrencyList] = useState([]);

  useEffect(() => {
    setCurrencyList(getList(currency, currList));
  }, [currency])


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
      <CurrencyList currency={currency} currencyList={currencyList} />
    </div>
  )
}

export default Rates
