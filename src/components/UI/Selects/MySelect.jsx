import React from "react";
import {getExclusiveList} from "../../../utils/listSorting";
import classes from "./MySelect.module.css";

const MySelect = ({value, onChange, defaultValue, currencyList, description}) => {
  const optionList = getExclusiveList(currencyList);

  return (
    <label>
      <span className={classes.name}>{description}</span>

      <select
        className={classes.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option disabled>{defaultValue}</option>
        {optionList.map((optionItem) => (
          <option key={optionItem}>{optionItem}</option>
        ))}
      </select>
    </label>
  );
};

export default MySelect;
