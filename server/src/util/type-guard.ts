export const isNone = (value: unknown): boolean => {
  return value === undefined || value === null;
};

export const isNotNone = (value: unknown): boolean => {
  return !isNone(value);
};
