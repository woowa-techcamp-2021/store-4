import { getCustomRepository } from 'typeorm';
import jwtService from './jwt.service';
import UserRepository from '../repositories/user-repository';

class UserService {
  async checkUser(token: string): Promise<void> {
    const { name, email } = jwtService.decode(token);
    const user = await getCustomRepository(UserRepository).findByEmail(email);

    if (user === undefined) {
      await this.createUser(name, email);
    }
  }

  private createUser(username: string, email: string) {
    return getCustomRepository(UserRepository).insert({ username, email });
  }
}

export default new UserService();
