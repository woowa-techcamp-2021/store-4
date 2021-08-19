import { Request, Response } from 'express';
import InvalidPathParameterException from '../exceptions/invalid-path-parameter-exception';
import UnauthenticatedException from '../exceptions/unauthenticated-exception';
import wishService from '../services/wish-service';

class WishController {
  async insertWish(req: Request, res: Response) {
    if (!req.decoded) {
      throw new UnauthenticatedException('인증이 필요합니다.');
    }

    const { productId } = req.params;

    if (productId) {
      throw new InvalidPathParameterException('productId가 유효한 값이 아닙니다.');
    }

    const { id: userId } = req.decoded;
    const wish = wishService.insertWish(userId, +productId);

    res.status(200).json({ wish });
  }
}

export default new WishController();
