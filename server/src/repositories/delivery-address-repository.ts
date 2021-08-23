import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import DeliveryAddress from '../models/delivery-address';

@EntityRepository(DeliveryAddress)
class DeliveryAddressRepository extends Repository<DeliveryAddress> {
  async findByUser(userId: number): Promise<DeliveryAddress[]> {
    return createQueryBuilder(DeliveryAddress).where('userId = :userId', { userId }).getMany();
  }
}

export default DeliveryAddressRepository;
