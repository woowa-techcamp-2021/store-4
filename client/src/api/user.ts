import request from '../lib/request';
import { UserResponse } from '../types/user';

class UserAPI {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  fetchUser(token: string): Promise<UserResponse> {
    return request<UserResponse>({
      url: `${this.baseURL}/auth/user`,
      method: 'POST',
      headers: {
        Authorization: token,
      },
    });
  }
}

export default UserAPI;
