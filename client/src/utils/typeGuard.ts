export const isNone = <T>(value: T | undefined | null): value is undefined | null => {
  return value === undefined || value === null;
};

export const isNotNone = <T>(value: T | undefined | null): value is T => {
  return !isNone(value);
};

export const isNumber = (value: unknown): value is number => {
  return !Number.isNaN(value);
};

export const isPositiveInteger = (value: unknown): value is number => {
  if (!isNumber(value)) {
    return false;
  }

  if (!Number.isInteger(value)) {
    return false;
  }

  if (value <= 0) {
    return false;
  }

  return true;
};

export const isNotPositiveInteger = <T>(value: T): value is T => {
  return !isPositiveInteger(value);
};
