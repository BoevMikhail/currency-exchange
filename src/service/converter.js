const bigDecimal = require("js-big-decimal");

export const converter = (baseCurrency, requiredCurrency, currencyList, amount, typeOfAnswer) => {
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

  if (typeOfAnswer === "smallAnswer") {
    const resultSmall = result.match(/^0\.0/);
    if (resultSmall) {
      const manyZeros = new RegExp(/0\.0*\d\d?/);
      result = result.match(manyZeros);
    } else {
      // need result with 2 or 0 digits after dot
      result = result.match(/\d*(\.\d\d?)?/)[0];
      if (result.match(/\.\d$/)) result += 0;
      if (result.match(/\.00/)) result = result.slice(0, -3);
    }
  }

  if (typeOfAnswer === "bigAnswer") {
    result = result.slice(0, 10);
  }

  return [result, error];
};
