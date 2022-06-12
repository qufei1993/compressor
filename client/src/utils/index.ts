type TObj = { [k: string]: unknown };

export const clearEmptyValue = (obj: TObj) => {
  const newObj: { [k: string]: unknown } = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const k in obj) {
    if (Object.prototype.toString.call(obj[k]) === '[object Object]') {
      clearEmptyValue(obj[k] as TObj);
    } else if (obj[k] !== null && obj[k] !== undefined) {
      newObj[k] = obj[k];
    }
  }

  return newObj;
};
