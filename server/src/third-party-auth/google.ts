import fetch from 'node-fetch';
import dotenv from '../config/dotenv';
import getQueryString from '../util/get-query-string';

const REDIRECT_URL = `${dotenv.SERVER_URL}/auth/google-callback`;
const BASE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth`;
const API_URL = `https://oauth2.googleapis.com`;

class GoogleAuth {
  public get URL(): string {
    const queryString = getQueryString({
      client_id: dotenv.GOOGLE_CLIENT_ID,
      redirect_uri: REDIRECT_URL,
      response_type: 'code',
      scope: 'openid+profile+email',
      prompt: 'select_account',
    });
    return `${BASE_AUTH_URL}${queryString}`;
  }

  public async getUserToken(code: string): Promise<string> {
    const requestBody = {
      code,
      client_id: dotenv.GOOGLE_CLIENT_ID,
      client_secret: dotenv.GOOGLE_CLIENT_SECRET,
      redirect_uri: REDIRECT_URL,
      grant_type: 'authorization_code',
    };

    const response = await fetch(`${API_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const { id_token }: { id_token: string } = await response.json();

    return id_token;
  }
}

export default new GoogleAuth();
