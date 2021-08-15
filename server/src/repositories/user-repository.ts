import { EntityRepository, Repository, createQueryBuilder } from 'typeorm';
import User from '../models/user';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | undefined> {
    return createQueryBuilder(User).where({ email }).getOne();
  }
}

export default UserRepository;
