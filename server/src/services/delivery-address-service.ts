import { getCustomRepository } from 'typeorm';
import DeliveryAddressNotfoundException from '../exceptions/delivery-address-notfound-exception';
import NotMyDeliveryAddressException from '../exceptions/not-my-delivery-address-exception';
import UserNotfoundException from '../exceptions/user-notfound-exception';
import DeliveryAddress from '../models/delivery-address';
import DeliveryAddressRepository from '../repositories/delivery-address-repository';
import UserRepository from '../repositories/user-repository';
import { isNone } from '../util/type-guard';
import DeliveryAddressCreate from '../validations/delivery-address-create';
import DeliveryAddressModify from '../validations/delivery-address-modify';

const ERROR_MESSAGES = {
  USER_NOTFOUND: '회원이 존재하지 않습니다.',
  DELIVERY_ADDRESS_NOTFOUND: '배송지가 존재하지 않습니다',
  NOT_MY_DELIVERY_ADDRESS: '본인 배송지가 아닙니다',
};

class DeliveryAddressService {
  async findAll(userId: number): Promise<DeliveryAddress[]> {
    const deliveryAddresses = await getCustomRepository(DeliveryAddressRepository).findByUser(
      userId
    );

    return deliveryAddresses;
  }

  async create(
    userId: number,
    deliveryAddressCreate: DeliveryAddressCreate
  ): Promise<DeliveryAddress> {
    const user = await getCustomRepository(UserRepository).findOne(userId);
    if (isNone(user)) {
      throw new UserNotfoundException(ERROR_MESSAGES.USER_NOTFOUND);
    }

    return getCustomRepository(DeliveryAddressRepository).save({
      ...deliveryAddressCreate,
      user,
    });
  }

  async modify(
    userId: number,
    deliveryAddressId: number,
    deliveryAddressModify: DeliveryAddressModify
  ): Promise<DeliveryAddress> {
    const user = await getCustomRepository(UserRepository).findOne(userId);
    if (isNone(user)) {
      throw new UserNotfoundException(ERROR_MESSAGES.USER_NOTFOUND);
    }

    const deliveryAddress = await getCustomRepository(DeliveryAddressRepository).findOneWithUser(
      deliveryAddressId
    );

    if (isNone(deliveryAddress)) {
      throw new DeliveryAddressNotfoundException(ERROR_MESSAGES.DELIVERY_ADDRESS_NOTFOUND);
    }

    if (deliveryAddress.user.id !== user.id) {
      throw new NotMyDeliveryAddressException(ERROR_MESSAGES.NOT_MY_DELIVERY_ADDRESS);
    }

    return getCustomRepository(DeliveryAddressRepository).save({
      id: deliveryAddressId,
      ...deliveryAddressModify,
      user,
    });
  }

  async delete(userId: number, deliveryAddressId: number): Promise<DeliveryAddress> {
    const user = await getCustomRepository(UserRepository).findOne(userId);
    if (isNone(user)) {
      throw new UserNotfoundException(ERROR_MESSAGES.USER_NOTFOUND);
    }

    const deliveryAddress = await getCustomRepository(DeliveryAddressRepository).findOneWithUser(
      deliveryAddressId
    );

    if (isNone(deliveryAddress)) {
      throw new DeliveryAddressNotfoundException(ERROR_MESSAGES.DELIVERY_ADDRESS_NOTFOUND);
    }

    if (deliveryAddress.user.id !== user.id) {
      throw new NotMyDeliveryAddressException(ERROR_MESSAGES.NOT_MY_DELIVERY_ADDRESS);
    }

    return getCustomRepository(DeliveryAddressRepository).remove(deliveryAddress);
  }
}

export default new DeliveryAddressService();
