import { Request, Response } from 'express';
import UserNotfoundException from '../exceptions/user-notfound-exception';
import orderService from '../services/order-service';
import { isNone } from '../util/type-guard';
import OrderCreate from '../validations/order-create';

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

  async create(req: Request, res: Response) {
    const { decoded, body } = req;

    if (isNone(decoded)) {
      throw new UserNotfoundException(ERROR_MESSAGES.USER_NOTFOUND);
    }

    const orderCreate = new OrderCreate(body);
    await orderCreate.validate();

    await orderService.createOrder(decoded.id, orderCreate);

    res.status(200).json({});
  }
}

export default new OrderController();
