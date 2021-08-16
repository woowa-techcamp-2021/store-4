import { Request, Response, NextFunction } from 'express';

const wrapAsync = (asyncFn: unknown) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (typeof asyncFn === 'function') {
      asyncFn(req, res, next).catch(next);
    }
  };
};

export default wrapAsync;
