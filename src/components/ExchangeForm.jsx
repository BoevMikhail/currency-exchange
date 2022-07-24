import React, { useContext, useEffect, useRef, useState } from 'react'
import { CurrencyListContext } from '../context';
import MyButton from './UI/button/MyButton'
import MyInput from './UI/Input/MyInput'
import MyTextarea from './UI/textarea/MyTextarea';
import { converter } from './utils/converter';

const ExchangeForm = () => {
  const {currList, isCurrenciesLoading} = useContext(CurrencyListContext);

  let request = useRef();
  let [result, setResult] = useState('Currencies is loading...');

  const exchange = () => {
    setResult(converter(request.current.value, currList));
  }

  useEffect(() => {
    if(!isCurrenciesLoading) setResult('result');
  }, [isCurrenciesLoading])


  return (
    <div className='ExchangeForm'>
      <MyInput ref={request} placeholder='Enter: Amount, Base currency and Required currency (15 rub in usd)' />
      <MyButton onClick={exchange} name='Exchange' disabled={isCurrenciesLoading}/>
      <MyTextarea value={result} readOnly  />
    </div>
  )
}

export default ExchangeForm
