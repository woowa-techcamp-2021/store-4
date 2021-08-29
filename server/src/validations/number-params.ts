import InvalidInputException from '../exceptions/invalid-input-exception';

const numberParamValidator = (param: string): number => {
  const numParam = Number(param);

  if (isNaN(numParam)) {
    throw new InvalidInputException('잘못된 파라미터입니다');
  }

  return numParam;
};

export default numberParamValidator;
