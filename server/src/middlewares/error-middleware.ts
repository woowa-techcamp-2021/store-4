import { NextFunction, Request, Response } from 'express';

import BusinessException from '../exceptions/business-exception';
import InvalidTokenException from '../exceptions/invalid-token-exception';
import InvalidInputException from '../exceptions/invalid-input-exception';
import InvalidPathParameterException from '../exceptions/invalid-path-parameter-exception';
import PageOverflowException from '../exceptions/page-overflow-exception';
import ProductNotfoundException from '../exceptions/product-notfound-exception';
import TokenExpiredException from '../exceptions/token-expired-exception';
import UnauthenticatedException from '../exceptions/unauthenticated-exception';
import UserNotfoundException from '../exceptions/user-notfound-exception';
import ProductNotOrderedException from '../exceptions/product-notordered-exception';
import ReviewNotfoundException from '../exceptions/review-notfound-exception';
import ReviewNotWrittenByUserException from '../exceptions/review-notwrittenbyuser-exception';
import DeliveryAddressNotfoundException from '../exceptions/delivery-address-notfound-exception';
import NotMyDeliveryAddressException from '../exceptions/not-my-delivery-address-exception';
import AWSS3Exception from '../exceptions/aws-s3-exception';

type HTTPErrors = {
  status: number;
};

const errors: { [key: string]: HTTPErrors } = {
  [InvalidTokenException.name]: { status: 401 },
  [InvalidInputException.name]: { status: 400 },
  [TokenExpiredException.name]: { status: 410 },
  [PageOverflowException.name]: { status: 400 },
  [InvalidPathParameterException.name]: { status: 400 },
  [UnauthenticatedException.name]: { status: 401 },
  [UserNotfoundException.name]: { status: 404 },
  [ProductNotfoundException.name]: { status: 404 },
  [ProductNotOrderedException.name]: { status: 401 },
  [ReviewNotfoundException.name]: { status: 404 },
  [ReviewNotWrittenByUserException.name]: { status: 401 },
  [DeliveryAddressNotfoundException.name]: { status: 404 },
  [NotMyDeliveryAddressException.name]: { status: 403 },
  [AWSS3Exception.name]: { status: 413 },
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
