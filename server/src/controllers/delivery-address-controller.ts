import { Request, Response } from 'express';
import UserNotfoundException from '../exceptions/user-notfound-exception';
import deliveryAddressService from '../services/delivery-address-service';
import { isNone } from '../util/type-guard';
import DeliveryAddressCreate from '../validations/delivery-address-create';
import DeliveryAddressModify from '../validations/delivery-address-modify';
import numberParamValidator from '../validations/number-params';

const ERROR_MESSAGES = {
  USER_NOTFOUND: '회원이 존재하지 않음',
};

class DeliveryAddressController {
  async findAll(req: Request, res: Response) {
    const { decoded } = req;

    if (isNone(decoded)) {
      throw new UserNotfoundException(ERROR_MESSAGES.USER_NOTFOUND);
    }

    const deliveryAddresses = await deliveryAddressService.findAll(decoded.id);

    res.status(200).json({
      deliveryAddresses,
    });
  }

  async create(req: Request, res: Response) {
    const { decoded, body } = req;

    if (isNone(decoded)) {
      throw new UserNotfoundException(ERROR_MESSAGES.USER_NOTFOUND);
    }

    const deliveryAddressCreate = new DeliveryAddressCreate(body);
    await deliveryAddressCreate.validate();

    const createdDeliveryAddress = await deliveryAddressService.create(
      decoded.id,
      deliveryAddressCreate
    );

    res.status(200).json({
      deliveryAddress: createdDeliveryAddress,
    });
  }

  async modify(req: Request, res: Response) {
    const { decoded, body, params } = req;

    if (isNone(decoded)) {
      throw new UserNotfoundException(ERROR_MESSAGES.USER_NOTFOUND);
    }

    const deliveryAddressModify = new DeliveryAddressModify(body);
    await deliveryAddressModify.validate();

    const { id } = params;
    const deliveryAddressId = numberParamValidator(id);

    const modifiedDeliveryAddress = await deliveryAddressService.modify(
      decoded.id,
      deliveryAddressId,
      deliveryAddressModify
    );

    res.status(200).json({
      deliveryAddress: modifiedDeliveryAddress,
    });
  }

  async delete(req: Request, res: Response) {
    const { decoded, params } = req;

    if (isNone(decoded)) {
      throw new UserNotfoundException(ERROR_MESSAGES.USER_NOTFOUND);
    }

    const { id } = params;
    const deliveryAddressId = numberParamValidator(id);

    await deliveryAddressService.delete(decoded.id, deliveryAddressId);

    res.status(200).json({});
  }
}

export default new DeliveryAddressController();
