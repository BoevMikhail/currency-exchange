import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { CurrencyListContext } from "../context";
import MyButton from "../components/UI/Buttons/MyButton";
import MyInput from "../components/UI/Inputs/MyInput";
import MyTextarea from "../components/UI/Textareas/MyTextarea";
import { converter } from "./service/converter";
import classes from "./Form.module.css";
import debounce from "lodash.debounce";
import MyWarnings from "../components/UI/Warnings/MyWarnings";

const ExchangerForm = () => {
  const { currList, isCurrenciesLoading, currencyCurrent } =
    useContext(CurrencyListContext);
  const [currency] = currencyCurrent;
  const request = useRef();
  const [result, setResult] = useState("Currencies is loading...");
  const [valid, setValid] = useState(false);
  const [warning, setWarning] = useState("");

  const validation = () => {
    const messageBody = request.current.value;
    if (!messageBody) {
      setWarning("");
      setValid(false);
      return;
    }

    const listCurrenciesInInput = messageBody
      .toUpperCase()
      .replace(/IN/g, "")
      .match(/[A-Z]+/g);

    if (!listCurrenciesInInput) {
      setWarning("Currencies not found");
      setValid(false);
      return;
    }
    if (listCurrenciesInInput.length > 2) {
      setWarning(`${listCurrenciesInInput.join(", ")} - too many currencies`);
      setValid(false);
      return;
    }
    if (
      (listCurrenciesInInput[1] && listCurrenciesInInput[1].length !== 3) ||
      (listCurrenciesInInput[0].length !== 3 &&
        listCurrenciesInInput[0].length !== 6) ||
      (listCurrenciesInInput[0].length === 6 && listCurrenciesInInput[1])
    ) {
      setWarning("Something wrong. Currencies must have only 3 letter");
      setValid(false);
      return;
    }
    setWarning("");
    setValid(true);
  };

  const exchange = () => {
    const amount = request.current.value.match(/\d+\.?\d+/) ?? 1;
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

    setResult(
      converter(
        listCurrenciesInInput[0],
        listCurrenciesInInput[1],
        currList,
        amount
      )
    );
  };

  const debouncedChangeHandler = useMemo(() => debounce(validation, 300), []);

  useEffect(() => {
    if (!isCurrenciesLoading) setResult("result");
  }, [isCurrenciesLoading]);

  return (
    <div className={classes.form}>
      <div style={{ width: "100%" }}>
        <MyInput
          onChange={() => {
            setValid(false);
            debouncedChangeHandler();
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter" && valid) exchange();
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
      <MyTextarea value={result} readOnly />
    </div>
  );
};

export default ExchangerForm;
