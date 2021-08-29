export const toKoreanMoneyFormat = (amount: number): string => {
  return `${amount.toLocaleString()}원`;
};

export const toKoreanMoneyFormatPure = (amount: number): string => {
  return amount.toLocaleString();
};
