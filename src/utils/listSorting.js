export const getExclusiveList = (currencyList) => {
  const exclusiveList = new Set(Object.keys(currencyList));

  return Array.from(exclusiveList).sort();
};
