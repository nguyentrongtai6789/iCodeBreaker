export function isArrayAllUndefined(arr: any) {
  if (!arr) return false;
  const newArr = arr as string[];
  return newArr.every((item) => item === undefined);
}
