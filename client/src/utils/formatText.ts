export default (text: string, maxLength: number): string => {
  let resultText = text.slice(0, maxLength);
  if (text.length > maxLength) resultText += '...';

  return resultText;
};
