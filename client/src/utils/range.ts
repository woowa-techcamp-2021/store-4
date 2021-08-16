export const range = (end: number): number[] => {
  const array = [];
  for (let num = 0; num < end; num++) {
    array.push(num);
  }
  return array;
};
