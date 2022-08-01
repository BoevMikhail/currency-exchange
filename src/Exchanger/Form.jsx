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

  const isValid = (listCurrenciesInInput) => {
    if (!listCurrenciesInInput) {
      setResult('Currencies not found');
      return false;
    }
    if (listCurrenciesInInput.length > 2) {
      setResult(`${ listCurrenciesInInput.join(', ') } - too many currencies`);
      return false;
    }
    if ((listCurrenciesInInput[1] && listCurrenciesInInput[1].length !== 3) || (listCurrenciesInInput[0].length !== 3 && listCurrenciesInInput[0].length !== 6) || (listCurrenciesInInput[0].length === 6 && listCurrenciesInInput[1])) {
      setResult('Something wrong. Currencies must have only 3 letter');
      return false;
    }
    return true;


  }

  const exchange = () => {
    const amount = request.current.value.match(/\d+\.?\d+/) ?? 1;
    const listCurrenciesInInput = request.current.value.toUpperCase().replace(/IN/g, '').match(/[A-Z]+/g);
    if (!isValid(listCurrenciesInInput)) return;

    if (listCurrenciesInInput[0].length === 3 && !listCurrenciesInInput[1]) {
      listCurrenciesInInput[1] = currency;
    }
    if (listCurrenciesInInput[0].length === 6) {
      listCurrenciesInInput[1] = listCurrenciesInInput[0].slice(-3);;
      listCurrenciesInInput[0] = listCurrenciesInInput[0].slice(0, 3);
    }

    setResult(converter(listCurrenciesInInput[0], listCurrenciesInInput[1], currList, amount));

  }


  useEffect(() => {
    if (!isCurrenciesLoading) setResult('result');
  }, [isCurrenciesLoading])


  return (
    <div className={classes.form}>
      <MyInput onKeyDown={(e) => {if (e.code === 'Enter') exchange()}} ref={request} placeholder={document.documentElement.clientWidth < 720 ? '(15 rub in usd)' : 'Enter: Amount, Base currency and Required currency (15 rub in usd)'} />
      <MyButton onClick={exchange} name='Exchange' disabled={isCurrenciesLoading} />
      <MyTextarea value={result} readOnly />
    </div>
  )
}

export default ExchangerForm
