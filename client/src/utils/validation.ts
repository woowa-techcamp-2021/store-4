export const isBlank = (value: string): boolean => {
  return value.trim().length <= 0;
};

export const isPhoneNumber = (value: string): boolean => {
  return value.match(/^[0-1]{3}-[0-9]{4}-[0-9]{4}$/) !== null;
};
