export const converter = (messageBody, currencyList, currency) => {
  let amount = messageBody.match(/\d+.\d+/);
  amount = amount ? amount : messageBody.match(/\d+/);
  if (!amount) amount = 1;

  messageBody = messageBody.toUpperCase().replace('IN', '').match(/[A-Z]+/g);
  if (!messageBody) return 'Currencies not found';
  if (messageBody.length > 2) return `${ messageBody.join(', ') } - too many currencies`

  let baseCurrency = messageBody.shift();
  let requiredCurrency = messageBody.pop();

  if (baseCurrency.length !== 3 && baseCurrency.length !== 6) return `'${ baseCurrency }' - not found. Currency must have 3 letter`

  if (!requiredCurrency && baseCurrency.length === 6) {
    requiredCurrency = baseCurrency.slice(-3);
    baseCurrency = baseCurrency.slice(0, 3);
  }

  if (!requiredCurrency) {
    requiredCurrency = currency;
  }

  let errorMessage = '';
  if (!Object.keys(currencyList).includes(baseCurrency)) errorMessage += `'${ baseCurrency }' `;
  if (baseCurrency !== requiredCurrency) if (!Object.keys(currencyList).includes(requiredCurrency)) errorMessage += `'${ requiredCurrency }' `;
  if (errorMessage) return errorMessage + '- not found';

  const exchangeRate = (1 / currencyList[baseCurrency]) / (1 / currencyList[requiredCurrency]);

  return `${ amount } ${ baseCurrency } = ${ +(amount * exchangeRate).toFixed(2) } ${ requiredCurrency }`;
}
