export const hasProperty = (value: unknown, property: string): boolean => {
  return Object.prototype.hasOwnProperty.call(value, property);
};
