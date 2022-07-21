export const converter = (messageBody, currencyList) => {

  let amount = messageBody.match(/\d+.\d+/);
  amount = amount ? amount : messageBody.match(/\d+/);
  if (!amount) return 'Amount not found';

  messageBody = messageBody.toUpperCase().replace(amount, '').replace('IN', '').replace(/\s/g, '');
  if (messageBody.length !== 6) return 'Not enought characters, be sure that you don\'t mistake';

  let baseCurrency = messageBody.slice(0, 3);
  let requiredCurrency = messageBody.slice(-3);

  let correctedList = currencyList.filter(currencyItem => (currencyItem.slice(0, 3) === baseCurrency && currencyItem.slice(-3) === requiredCurrency) || (currencyItem.slice(-3) === baseCurrency && currencyItem.slice(0, 3) === requiredCurrency));
  if (correctedList.length === 0) {
    correctedList = currencyList.filter(currencyItem => (currencyItem.slice(0, 3) === baseCurrency || currencyItem.slice(-3) === baseCurrency));
    correctedList = correctedList.map(currencyItem => currencyItem.replace(baseCurrency, ''));
    console.log(correctedList);
    if (correctedList.length !== 0) {return `'${baseCurrency}' can be changed to ${correctedList.join(' - ')}`} else
      return `'${baseCurrency}' not found`;
  }

  // тут запрос обмена
  const exchangeRate = 62.7
  // не забыть написать !!!

  return `${amount} ${baseCurrency} = ${(amount * exchangeRate).toFixed(2)} ${requiredCurrency}`;
}
