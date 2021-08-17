import { Request, Response, NextFunction } from 'express';
import jwtService from '../services/jwt-service';
import InvalidTokenException from '../exceptions/invaild-token-exception';
import TokenExpiredException from '../exceptions/token-expired-exception';
import { TokenExpiredError } from 'jsonwebtoken';
import { isNone } from '../util/type-guard';

type AuthType = 'user' | 'guest';

const authMiddleware =
  (authType: AuthType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { authorization } = req.headers;
      if (isNone(authorization)) {
        throw new InvalidTokenException('토큰 정보가 올바르지 않습니다.');
      }

      const decoded = jwtService.verify(authorization as string);
      req.decoded = decoded;
      next();
    } catch (error) {
      if (authType === 'guest') {
        next();
        return;
      }

      if (error instanceof TokenExpiredError) {
        throw new TokenExpiredException('토큰이 만료됐습니다.');
      } else {
        throw new InvalidTokenException('토큰 정보가 올바르지 않습니다.');
      }
    }
  };

export default authMiddleware;
