import { Request, Response } from 'express';
import InvalidPathParameterException from '../exceptions/invalid-path-parameter-exception';
import UnauthenticatedException from '../exceptions/unauthenticated-exception';
import wishService from '../services/wish-service';
import numberParamValidator from '../validations/number-params';

class WishController {
  async insertWish(req: Request, res: Response) {
    if (!req.decoded) {
      throw new UnauthenticatedException('인증이 필요합니다.');
    }

    const { id } = req.params;
    const productId = numberParamValidator(id);

    if (!id) {
      throw new InvalidPathParameterException('productId가 유효한 값이 아닙니다.');
    }

    const { id: userId } = req.decoded;
    const wish = await wishService.insertWish(userId, productId);

    res.status(200).json({ wish });
  }

  async deleteWish(req: Request, res: Response) {
    if (!req.decoded) {
      throw new UnauthenticatedException('인증이 필요합니다.');
    }

    const { id } = req.params;
    const productId = numberParamValidator(id);

    if (!id) {
      throw new InvalidPathParameterException('productId가 유효한 값이 아닙니다.');
    }

    const { id: userId } = req.decoded;
    await wishService.deleteWish(userId, productId);

    res.status(200).json({});
  }

  async getWishList(req: Request, res: Response) {
    if (!req.decoded) {
      throw new UnauthenticatedException('인증이 필요합니다.');
    }

    const { id: userId } = req.decoded;
    console.log(userId);
    const wishList = await wishService.getWishList(userId);

    res.status(200).json({ wishList });
  }
}

export default new WishController();
