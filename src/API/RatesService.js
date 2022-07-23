export const getExclusiveList = (currencyList) => {
  const exclusiveList = new Set();
  Object.keys(currencyList).forEach(currencyItem => {
    exclusiveList.add(currencyItem)
  })

  return Array.from(exclusiveList).sort();
}
