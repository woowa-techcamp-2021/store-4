import { getCustomRepository } from 'typeorm';
import DeliveryAddress from '../models/delivery-address';
import DeliveryAddressRepository from '../repositories/delivery-address-repository';

class DeliveryAddressService {
  async findAll(userId: number): Promise<DeliveryAddress[]> {
    const deliveryAddresses = await getCustomRepository(DeliveryAddressRepository).findByUser(
      userId
    );

    return deliveryAddresses;
  }
}

export default new DeliveryAddressService();
