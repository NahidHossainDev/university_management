export const pick = <T extends object, k extends keyof T>(
  obj: T,
  keys: k[]
): Partial<T> => {
  const finalObj: Partial<T> = {};

  for (let i = 0; keys.length > i; i++) {
    if (Object.hasOwnProperty.call(obj, keys[i])) {
      finalObj[keys[i]] = obj[keys[i]];
    }
  }

  return finalObj;
};
