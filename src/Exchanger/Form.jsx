import React, {useContext, useEffect, useRef, useState} from 'react'
import {CurrencyListContext} from '../context';
import MyButton from '../components/UI/Buttons/MyButton'
import MyInput from '../components/UI/Inputs/MyInput'
import MyTextarea from '../components/UI/Textareas/MyTextarea';
import {converter} from './service/converter';
import classes from './Form.module.css';

const ExchangerForm = () => {
  const {currList, isCurrenciesLoading, currencyCurrent} = useContext(CurrencyListContext);
  const [currency] = currencyCurrent;
  const request = useRef();
  const [result, setResult] = useState('Currencies is loading...');

  const exchange = () => {
    setResult(converter(request.current.value, currList, currency));
  }

  useEffect(() => {
    if (!isCurrenciesLoading) setResult('result');
  }, [isCurrenciesLoading])


  return (
    <div className={classes.form}>
      <MyInput onKeyDown={(e) => {if (e.key === 'Enter') exchange()}} ref={request} placeholder={document.documentElement.clientWidth < 720 ? '(15 rub in usd)' : 'Enter: Amount, Base currency and Required currency (15 rub in usd)'} />
      <MyButton onClick={exchange} name='Exchange' disabled={isCurrenciesLoading} />
      <MyTextarea value={result} readOnly />
    </div>
  )
}

export default ExchangerForm
