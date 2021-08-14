import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/user-repository';

class UserService {
  async checkUserByEmail(email: string): Promise<boolean> {
    const user = await getCustomRepository(UserRepository).findByEmail(email);

    if (user === undefined) return false;
    else return true;
  }

  async registerUser({ username, email }: { username: string; email: string }) {
    return getCustomRepository(UserRepository).insert({ username, email });
  }
}

export default new UserService();
