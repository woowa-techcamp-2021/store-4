import { Request, Response } from 'express';
import UserNotfoundException from '../exceptions/user-notfound-exception';
import orderService from '../services/order-service';
import { isNone } from '../util/type-guard';

const ERROR_MESSAGES = {
  USER_NOTFOUND: '회원이 존재하지 않음',
};

class OrderController {
  async findAll(req: Request, res: Response) {
    const { decoded } = req;

    if (isNone(decoded)) {
      throw new UserNotfoundException(ERROR_MESSAGES.USER_NOTFOUND);
    }

    const orders = await orderService.findByUser(decoded.id);

    res.status(200).json({
      orders,
    });
  }
}

export default new OrderController();
