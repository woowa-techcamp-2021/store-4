import { getCustomRepository } from 'typeorm';
import User from '../models/user';
import UserRepository from '../repositories/user-repository';

class UserService {
  async checkUserByEmail(email: string): Promise<boolean> {
    const user = await getCustomRepository(UserRepository).findByEmail(email);

    if (user instanceof User) return true;
    else return false;
  }

  async registerUser({ username, email }: { username: string; email: string }) {
    return getCustomRepository(UserRepository).insert({ username, email });
  }
}

export default new UserService();
