export const answerResizer = (value, typeOfAnswer) => {
  if (typeOfAnswer === "smallAnswer") {
    const resultSmall = value.match(/^0\.0/);
    if (resultSmall) {
      const manyZeros = new RegExp(/0\.0*\d\d?/);
      value = value.match(manyZeros);
    } else {
      // need result with 2 or 0 digits after dot
      value = value.match(/\d*(\.\d\d?)?/)[0];
      if (value.match(/\.\d$/)) value += 0;
      if (value.match(/\.00/)) value = value.slice(0, -3);
    }
  }

  if (typeOfAnswer === "bigAnswer") {
    value = value.slice(0, 13);
  }

  return value;
};
