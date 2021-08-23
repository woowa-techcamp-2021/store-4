import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import DeliveryAddress from '../models/delivery-address';

@EntityRepository(DeliveryAddress)
class DeliveryAddressRepository extends Repository<DeliveryAddress> {
  async findByUser(userId: number): Promise<DeliveryAddress[]> {
    return createQueryBuilder(DeliveryAddress).where('user_id = :userId', { userId }).getMany();
  }

  async findOneWithUser(deliveryAddressId: number): Promise<DeliveryAddress | undefined> {
    return createQueryBuilder(DeliveryAddress)
      .leftJoinAndSelect('DeliveryAddress.user', 'user')
      .where('DeliveryAddress.id = :deliveryAddressId', { deliveryAddressId })
      .getOne();
  }
}

export default DeliveryAddressRepository;
