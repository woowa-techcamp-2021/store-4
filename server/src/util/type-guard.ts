export const isNone = <T>(value: unknown): value is T => {
  return value === undefined || value === null;
};

export const isNotNone = (value: unknown): boolean => {
  return !isNone(value);
};
