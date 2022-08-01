export const converter = (baseCurrency, requiredCurrency, currencyList, amount) => {
  let errorMessage = '';

  const baseIsNotInCurrencyList = !currencyList[baseCurrency];
  if (baseIsNotInCurrencyList) errorMessage += `'${ baseCurrency }' `;

  const requiredIsNotInCurrencyList = (baseCurrency !== requiredCurrency) && !currencyList[requiredCurrency];
  if (requiredIsNotInCurrencyList) errorMessage += `'${ requiredCurrency }' `;

  if (errorMessage) return errorMessage + '- not found';

  const exchangeRate = (1 / currencyList[baseCurrency]) / (1 / currencyList[requiredCurrency]);

  return `${ amount } ${ baseCurrency } = ${ +(amount * exchangeRate).toFixed(2) } ${ requiredCurrency }`;
}
