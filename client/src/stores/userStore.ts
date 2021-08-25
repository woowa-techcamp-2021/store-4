import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import User from '../models/user';
import apis from '../api';
import { isNone } from '../utils/typeGuard';

class UserStore {
  @observable
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);

    this.setTokenToLocalStorage();
    this.fetchUser();
  }

  private setTokenToLocalStorage() {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (isNone(token)) {
      return;
    }

    localStorage.setItem('token', token);
    history.replaceState(null, '', '/');
  }

  @action
  private async fetchUser() {
    try {
      const token = localStorage.getItem('token');
      if (isNone(token)) {
        throw new Error();
      }

      const { user } = await apis.userAPI.fetchUser(token);

      runInAction(() => {
        this.user = user;
      });
    } catch {
      localStorage.removeItem('token');
      this.user = null;
    }
  }

  @action
  logoutUser() {
    localStorage.removeItem('token');
    this.user = null;
  }

  get token() {
    const token = localStorage.getItem('token');
    if (isNone(token)) {
      throw new Error('invalid token');
    }

    return token;
  }
}

export default new UserStore();
