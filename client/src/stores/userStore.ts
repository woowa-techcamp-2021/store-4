import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import User from '../models/user';
import apis from '../api';
import { isNone } from '../utils/typeGuard';
import toast from '../lib/toast';

const USER_TOKEN_KEY = 'token';

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
    const token = searchParams.get(USER_TOKEN_KEY);

    if (isNone(token)) {
      return;
    }

    localStorage.setItem(USER_TOKEN_KEY, token);
    history.replaceState(null, '', '/');
  }

  @action
  private async fetchUser() {
    try {
      const token = this.token;

      if (token === '') {
        return;
      }

      const { user } = await apis.userAPI.fetchUser(token);

      runInAction(() => {
        this.user = user;
      });
    } catch {
      localStorage.removeItem(USER_TOKEN_KEY);
      this.user = null;
    }
  }

  @action
  logoutUser() {
    localStorage.removeItem(USER_TOKEN_KEY);
    this.user = null;
  }

  get token() {
    const token = localStorage.getItem(USER_TOKEN_KEY);

    if (token === null) {
      return '';
    }

    return token;
  }
}

export default new UserStore();
