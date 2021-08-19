import { getCustomRepository } from 'typeorm';
import User from '../models/user';
import UserRepository from '../repositories/user-repository';

class UserService {
  async checkUserByEmail(email: string): Promise<User | undefined> {
    const user = await getCustomRepository(UserRepository).findByEmail(email);

    return user;
  }

  async registerUser({ username, email }: { username: string; email: string }): Promise<User> {
    return getCustomRepository(UserRepository).save({ username, email });
  }
}

export default new UserService();
