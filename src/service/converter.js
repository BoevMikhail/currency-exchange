const bigDecimal = require("js-big-decimal");

export const converter = (baseCurrency, requiredCurrency, currencyList, amount, type) => {
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

  const baseCurrencyRate = bigDecimal.divide(1, currencyList[baseCurrency]);
  const requiredCurrencyRate = bigDecimal.divide(1, currencyList[requiredCurrency]);
  const exchangeRate = bigDecimal.divide(baseCurrencyRate, requiredCurrencyRate);
  let result = bigDecimal.multiply(amount, exchangeRate);

  if (type === "smallAnswer") {
    const resultSmall = result.match(/0.0/);
    if (resultSmall) {
      result = result.match(/0.0*\d\d/);
    } else {
      result = result.match(/\d*\.\d\d/);
    }
  }

  if (type === "bigAnswer") {
    result = result.slice(0, 10);
  }

  return [result, error];
};
