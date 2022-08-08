import debounce from "lodash.debounce";
import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import MyButton from "../components/UI/Buttons/MyButton";
import MyInput from "../components/UI/Inputs/MyInput";
import MyTextarea from "../components/UI/Textareas/MyTextarea";
import MyWarnings from "../components/UI/Warnings/MyWarnings";
import {CurrencyListContext} from "../context";
import classes from "./Form.module.css";
import {converter} from "./service/converter";

const ExchangerForm = () => {
  const {currList, isCurrenciesLoading, currencyCurrent} = useContext(CurrencyListContext);
  const [currency] = currencyCurrent;
  const request = useRef();
  const [result, setResult] = useState("Currencies is loading...");
  const [valid, setValid] = useState(false);
  const [warning, setWarning] = useState("");

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

    setResult(converter(listCurrenciesInInput[0], listCurrenciesInInput[1], currList, amount));

    setValid(false);
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
