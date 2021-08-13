import fetch from 'node-fetch';
import dotenv from '../config/dotenv';
import getQueryString from '../util/get-query-string';

const REDIRECT_URL = `${dotenv.SERVER_URL}/auth/facebook-callback`;
const BASE_AUTH_URL = `https://www.facebook.com/v11.0/dialog/oauth`;
const API_URL = `https://graph.facebook.com/v11.0`;

type FacebookUserData = {
  id: string;
  email: string;
  name: string;
};

class FacebookAuth {
  public get URL(): string {
    const queryString = getQueryString({
      client_id: dotenv.FACEBOOK_CLIENT_ID,
      redirect_uri: REDIRECT_URL,
      scope: 'email',
    });
    return `${BASE_AUTH_URL}${queryString}`;
  }

  public async getUserData(code: string): Promise<FacebookUserData> {
    const accessToken = await this.getAccessToken(code);
    const queryString = getQueryString({
      fields: 'name,email',
      access_token: accessToken,
    });

    const response = await fetch(`${API_URL}/me${queryString}`);
    const { id, name, email }: FacebookUserData = await response.json();

    return { id, name, email };
  }

  private async getAccessToken(code: string): Promise<string> {
    const queryString = getQueryString({
      code,
      client_id: dotenv.FACEBOOK_CLIENT_ID,
      client_secret: dotenv.FACEBOOK_CLIENT_SECRET,
      redirect_uri: REDIRECT_URL,
    });

    const response = await fetch(`${API_URL}/oauth/access_token${queryString}`);
    const { access_token }: { access_token: string } = await response.json();

    return access_token;
  }
}

export default new FacebookAuth();
