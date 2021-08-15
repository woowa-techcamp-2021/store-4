import { EntityRepository, Repository } from 'typeorm';
import Wish from '../models/wish';

@EntityRepository(Wish)
class WishRepository extends Repository<Wish> {}

export default WishRepository;
