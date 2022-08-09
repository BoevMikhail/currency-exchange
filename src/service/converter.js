import {answerResizer} from "../utils/answerResizer";
import fakeAnswer from "./CurrencyList.json";
const bigDecimal = require("js-big-decimal");

export const converter = (baseCurrency, requiredCurrency, amount, typeOfAnswer) => {
  const currencyList = fakeAnswer.rates;
  let errorMessage = "";
  let error = false;

  const baseIsNotInCurrencyList = !currencyList[baseCurrency];
  if (baseIsNotInCurrencyList) errorMessage += `'${baseCurrency}' `;

  const requiredIsNotInCurrencyList =
    baseCurrency !== requiredCurrency && !currencyList[requiredCurrency];
  if (requiredIsNotInCurrencyList) errorMessage += `'${requiredCurrency}' `;

  if (errorMessage) {
    error = true;
    return [errorMessage + "- not found", error];
  }

  const baseCurrencyRate = bigDecimal.divide(1, currencyList[baseCurrency], 20);
  const requiredCurrencyRate = bigDecimal.divide(1, currencyList[requiredCurrency], 20);
  const exchangeRate = bigDecimal.divide(baseCurrencyRate, requiredCurrencyRate, 20);
  let result = bigDecimal.multiply(amount, exchangeRate);

  result = answerResizer(result, typeOfAnswer);

  return [result, error];
};
