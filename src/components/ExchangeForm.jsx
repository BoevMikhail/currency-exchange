import React, { useContext, useRef, useState } from 'react'
import { CurrencyListContext } from '../context';
import MyButton from './UI/button/MyButton'
import MyInput from './UI/Input/MyInput'
import MyTextarea from './UI/textarea/MyTextarea';
import { converter } from './utils/converter';

const ExchangeForm = () => {
  const {currList} = useContext(CurrencyListContext);

  let request = useRef();
  let [result, setResult] = useState('Result');

  const exchange = () => {
    setResult(converter(request.current.value, currList));
  }


  return (
    <div className='ExchangeForm'>
      <MyInput ref={request} placeholder='Enter: Amount, Base currency and Required currency (15 rub in usd)' />
      <MyButton onClick={exchange} name='Exchange' />
      <MyTextarea value={result} readOnly  />
    </div>
  )
}

export default ExchangeForm
