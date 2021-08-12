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
    return BASE_AUTH_URL + queryString;
  }
}

export default new GoogleAuth();
