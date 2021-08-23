import { getCustomRepository } from 'typeorm';
import UserNotfoundException from '../exceptions/user-notfound-exception';
import DeliveryAddress from '../models/delivery-address';
import DeliveryAddressRepository from '../repositories/delivery-address-repository';
import UserRepository from '../repositories/user-repository';
import { isNone } from '../util/type-guard';
import DeliveryAddressCreate from '../validations/delivery-address-create';

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
      throw new UserNotfoundException('유저가 없습니다.');
    }

    return getCustomRepository(DeliveryAddressRepository).save({
      ...deliveryAddressCreate,
      user,
    });
  }
}

export default new DeliveryAddressService();
