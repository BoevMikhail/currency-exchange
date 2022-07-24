export const converter = (messageBody, currencyList) => {

  let amount = messageBody.match(/\d+.\d+/);
  amount = amount ? amount : messageBody.match(/\d+/);
  if (!amount) return 'Amount not found';

  messageBody = messageBody.toUpperCase().replace(amount, '').replace('IN', '').replace(/\s/g, '');
  if (messageBody.length !== 6) return 'Not enought letters, be sure that you don\'t mistake';

  let baseCurrency = messageBody.slice(0, 3);
  let requiredCurrency = messageBody.slice(-3);

  let errorMessage = '';
  if(!Object.keys(currencyList).includes(baseCurrency)) errorMessage += `'${baseCurrency}' `;
  if(!Object.keys(currencyList).includes(requiredCurrency)) errorMessage += `'${requiredCurrency}' `;
  if(errorMessage) return errorMessage + '- not found';

  const exchangeRate = (1/currencyList[baseCurrency]) / (1/currencyList[requiredCurrency]);

  return `${amount} ${baseCurrency} = ${+(amount * exchangeRate).toFixed(2)} ${requiredCurrency}`;
}
