import fetch from 'node-fetch';
import dotenv from '../config/dotenv';
import buildQueryString from '../util/build-query-string';

const REDIRECT_URL = `${dotenv.SERVER_URL}/auth/google-callback`;
const BASE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth`;
const API_URL = `https://oauth2.googleapis.com`;
const RESPONSE_TYPE = 'code';
const SCOPE: string[] = ['openid', 'profile', 'email'];
const PROMPT = 'select_account';
const GRANT_TYPE = 'authorization_code';

class GoogleAuth {
  public get URL(): string {
    const queryString = buildQueryString({
      client_id: dotenv.GOOGLE_CLIENT_ID,
      redirect_uri: REDIRECT_URL,
      response_type: RESPONSE_TYPE,
      scope: SCOPE.join('+'),
      prompt: PROMPT,
    });
    return `${BASE_AUTH_URL}${queryString}`;
  }

  public async getUserToken(code: string): Promise<string> {
    const requestBody = {
      code,
      client_id: dotenv.GOOGLE_CLIENT_ID,
      client_secret: dotenv.GOOGLE_CLIENT_SECRET,
      redirect_uri: REDIRECT_URL,
      grant_type: GRANT_TYPE,
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
