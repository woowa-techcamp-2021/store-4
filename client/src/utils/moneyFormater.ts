export const getKoreanMoneyFormat = (amount: number): string => {
  return `${amount.toLocaleString()}원`;
};
