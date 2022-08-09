import React, {useContext} from "react";
import {CurrencyListContext} from "../../context";
import {converter} from "../../service/converter";
import RatesItem from "./Item";
import classes from "./List.module.css";

const RatesList = ({currency, currencyList}) => {
  const {currList, isCurrenciesLoading} = useContext(CurrencyListContext);

  return (
    <div>
      <div className={classes.list}>
        {isCurrenciesLoading && <div>Currencies is loading...</div>}
        {Object.keys(currencyList).map(
          (currencyItem) =>
            currencyList[currencyItem] !== currencyList[currency] && (
              <RatesItem
                key={currencyItem}
                rate={converter(currency, currencyItem, currList, 1, "bigAnswer")}
                currencyItem={currencyItem}
              />
            )
        )}
      </div>
    </div>
  );
};

export default RatesList;
