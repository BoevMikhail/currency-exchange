import React from "react";
import classes from "./Item.module.css";

const RatesItem = ({currencyItem, rate}) => {
  return (
    <div className={classes.item}>
      <span>{rate[0]}</span>
      <span>{currencyItem}</span>
    </div>
  );
};

export default RatesItem;
