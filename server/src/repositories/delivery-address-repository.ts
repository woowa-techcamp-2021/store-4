import { EntityRepository, Repository } from 'typeorm';
import DeliveryAddress from '../models/delivery-address';

@EntityRepository(DeliveryAddress)
class DeliveryAddressRepository extends Repository<DeliveryAddress> {}

export default DeliveryAddressRepository;
