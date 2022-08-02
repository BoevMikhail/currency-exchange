import React, { useContext } from "react";
import { CurrencyListContext } from "../context";
import RatesItem from "./Item";
import classes from "./List.module.css";

const RatesList = ({ currency, currencyList }) => {
  const { isCurrenciesLoading } = useContext(CurrencyListContext);

  return (
    <div>
      <div className={classes.list}>
        {isCurrenciesLoading && <div>Currencies is loading...</div>}
        {Object.keys(currencyList).map(
          (currencyItem) =>
            currencyList[currencyItem] !== currencyList[currency] && (
              <RatesItem
                key={currencyItem}
                rate={(
                  1 /
                  currencyList[currency] /
                  (1 / currencyList[currencyItem])
                )
                  .toString()
                  .slice(0, 10)}
                currencyItem={currencyItem}
              />
            )
        )}
      </div>
    </div>
  );
};

export default RatesList;
