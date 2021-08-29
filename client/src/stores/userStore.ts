import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import User from '../models/user';
import apis from '../api';
import { isNone } from '../utils/typeGuard';
import toast from '../lib/toast';

const USER_TOKEN_KEY = 'token';

type Status = 'IDLE' | 'FETCHING' | 'DONE';

class UserStore {
  @observable
  user: User | null = null;

  @observable
  status: Status = 'IDLE';

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
    this.setStatus('FETCHING');
    try {
      const token = this.token;

      if (token === '') {
        return;
      }

      const { user } = await apis.userAPI.fetchUser(token);

      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      this.onAuthError(error.status);
    } finally {
      this.setStatus('DONE');
    }
  }

  @action
  setStatus(status: Status) {
    this.status = status;
  }

  @action
  logoutUser() {
    localStorage.removeItem(USER_TOKEN_KEY);
    this.user = null;
  }

  onAuthError(status: unknown) {
    switch (status) {
      case 401:
      case 410:
        toast.error('다시 로그인해주세요');
        break;
      default:
        toast.error('오류가 발생했습니다');
    }

    this.logoutUser();
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
