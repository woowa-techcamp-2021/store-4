export const isNone = <T>(value: T | undefined | null): value is undefined | null => {
  return value === undefined || value === null;
};

export const isNotNone = <T>(value: T | undefined | null): value is T => {
  return !isNone(value);
};
