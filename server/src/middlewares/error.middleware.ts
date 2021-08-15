import { NextFunction, Request, Response } from 'express';

import BusinessException from '../exceptions/business.exception';

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  console.log(error);
  if (error instanceof BusinessException) {
    const { message, status } = error;
    res.status(status).json({ message });
  } else {
    res.status(500).json({ message: '서버 에러' });
  }

  next();
};

export default errorMiddleware;
