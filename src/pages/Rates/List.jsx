import React, {useContext} from "react";
import {CurrencyListContext} from "../../context";
import {converter} from "../../service/converter";
import {answerResizer} from "../../utils/answerResizer";
import RatesItem from "./Item";
import classes from "./List.module.css";

const RatesList = ({currency, currencyList}) => {
  const {isCurrenciesLoading, localVersion} = useContext(CurrencyListContext);
  const [useLocal] = localVersion;

  return (
    <div>
      <div className={classes.list}>
        {isCurrenciesLoading && <div>Currencies is loading...</div>}
        {Object.keys(currencyList).map(
          (currencyItem) =>
            currencyList[currencyItem] !== currencyList[currency] && (
              <RatesItem
                key={currencyItem}
                rate={
                  useLocal
                    ? converter(currency, currencyItem, 1, "bigAnswer")[0]
                    : answerResizer(currencyList[currencyItem].toString(), "bigAnswer")
                }
                currencyItem={currencyItem}
              />
            )
        )}
      </div>
    </div>
  );
};

export default RatesList;
