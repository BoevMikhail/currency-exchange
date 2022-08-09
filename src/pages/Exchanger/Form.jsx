import debounce from "lodash.debounce";
import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import MyButton from "../../components/UI/Buttons/MyButton";
import MyInput from "../../components/UI/Inputs/MyInput";
import MyTextarea from "../../components/UI/Textareas/MyTextarea";
import MyWarnings from "../../components/UI/Warnings/MyWarnings";
import {CurrencyListContext} from "../../context";
import classes from "./Form.module.css";
import {converter} from "../../service/converter";
import {useFetching} from "../../hooks/useFetching.js";
import CurrencyService from "../../service/CurrencyService.js";
import {answerResizer} from "../../utils/answerResizer";

const ExchangerForm = () => {
  const {isCurrenciesLoading, currencyCurrent, localVersion} = useContext(CurrencyListContext);
  const [useLocal, setUseLocal] = localVersion;
  const [currency] = currencyCurrent;
  const request = useRef();
  const [result, setResult] = useState("Currencies is loading...");
  const [valid, setValid] = useState(false);
  const [warning, setWarning] = useState("");
  const [exchangeCurrencies] = useFetching(async (amount, from, to, setLocal) => {
    const response = await CurrencyService.exchangeCurrencies(amount, from, to, setLocal);
    if (Array.isArray(response)) {
      setResult(response[0]);
    } else {
      const correctResponse = answerResizer(response.toString(), "smallAnswer");
      setResult(`${amount} ${from} \n ${correctResponse} ${to}`);
    }
  });
  const debouncedValidation = useMemo(
    () =>
      debounce((messageBody) => {
        if (!messageBody) {
          setWarning("");
          return;
        }

        const listCurrenciesInInput = messageBody
          .toUpperCase()
          .replace(/IN/g, "")
          .match(/[A-Z]+/g);

        if (!listCurrenciesInInput) {
          setWarning("Currencies not found");
          return;
        }

        if (listCurrenciesInInput.length > 2) {
          setWarning(`${listCurrenciesInInput.join(", ")} - too many currencies`);
          return;
        }

        const uncorrectCurrenciesLength =
          (listCurrenciesInInput[1] && listCurrenciesInInput[1].length !== 3) ||
          (listCurrenciesInInput[0].length !== 3 && listCurrenciesInInput[0].length !== 6) ||
          (listCurrenciesInInput[0].length === 6 && listCurrenciesInInput[1]);

        if (uncorrectCurrenciesLength) {
          setWarning("Something wrong. Currencies must have only 3 letter");
          return;
        }

        setWarning("");
        setValid(true);
      }, 300),
    []
  );

  const validation = (messageBody) => {
    if (valid) {
      setValid(false);
    }
    setWarning("");
    debouncedValidation(messageBody);
  };

  const exchange = () => {
    if (!useLocal) setValid(false);
    const amount = request.current.value.match(/\d+\.?\d*/) ?? 1;
    const listCurrenciesInInput = request.current.value
      .toUpperCase()
      .replace(/IN/g, "")
      .match(/[A-Z]+/g);

    if (listCurrenciesInInput[0].length === 3 && !listCurrenciesInInput[1]) {
      listCurrenciesInInput[1] = currency;
    }

    if (listCurrenciesInInput[0].length === 6) {
      listCurrenciesInInput[1] = listCurrenciesInInput[0].slice(-3);
      listCurrenciesInInput[0] = listCurrenciesInInput[0].slice(0, 3);
    }

    if (useLocal) {
      const converterAnswer = converter(
        listCurrenciesInInput[0],
        listCurrenciesInInput[1],
        amount,
        "smallAnswer"
      );

      const converterError = converterAnswer[1];
      if (converterError) {
        setResult(converterAnswer[0]);
      } else {
        setResult(
          `${amount} ${listCurrenciesInInput[0]} \n ${converterAnswer[0]} ${listCurrenciesInInput[1]}`
        );
      }
    } else {
      setResult("Currency exchanging...");
      exchangeCurrencies(amount, listCurrenciesInInput[0], listCurrenciesInInput[1], setUseLocal);
    }
  };

  useEffect(() => {
    return () => {
      debouncedValidation.cancel();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isCurrenciesLoading) setResult("result");
  }, [isCurrenciesLoading]);

  return (
    <div className={classes.form}>
      <div style={{width: "100%"}}>
        <MyInput
          onChange={() => validation(request.current.value)}
          onKeyDown={(e) => {
            if (valid && e.keyCode === 13) exchange();
          }}
          ref={request}
          placeholder={
            document.documentElement.clientWidth < 720
              ? "(15 rub in usd)"
              : "Enter: Amount, Base currency and Required currency (15 rub in usd)"
          }
        />
        <MyWarnings>{warning}</MyWarnings>
      </div>
      <MyButton
        onClick={exchange}
        name="Exchange"
        disabled={isCurrenciesLoading || !valid}
      />
      <MyTextarea
        value={result}
        readOnly
      />
    </div>
  );
};

export default ExchangerForm;
