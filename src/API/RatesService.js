export const getList = (baseCurrency, currencyList) => {
  let correctedList = currencyList.filter(currencyItem => baseCurrency === currencyItem.slice(0, 3) || baseCurrency === currencyItem.slice(-3))
  correctedList = correctedList.map(corrItem => corrItem.replace(baseCurrency, ''));
  return correctedList;
}

export const getExclusiveList = (currencyList) => {
  const exclusiveList = new Set();
  currencyList.forEach(currencyItem => {
    exclusiveList.add(currencyItem.slice(0, 3))
    exclusiveList.add(currencyItem.slice(-3))
  })

  return Array.from(exclusiveList).sort();
}
