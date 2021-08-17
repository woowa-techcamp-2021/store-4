import { NextFunction, Request, Response } from 'express';

import BusinessException from '../exceptions/business-exception';
import InvalidTokenException from '../exceptions/invaild-token-exception';
import TokenExpiredException from '../exceptions/token-expired-exception';

type HTTPErrors = {
  status: number;
};

const errors: { [key: string]: HTTPErrors } = {
  [InvalidTokenException.name]: { status: 401 },
  [TokenExpiredException.name]: { status: 410 },
};

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  console.log(error);
  const { message } = error;
  if (error instanceof BusinessException) {
    const { status } = errors[error.constructor.name];
    res.status(status).json({ message });
  } else {
    res.status(500).json({ message: '서버 에러' });
  }

  next();
};

export default errorMiddleware;