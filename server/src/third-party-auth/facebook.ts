// import fetch from 'node-fetch';
import dotenv from '../config/dotenv';
import getQueryString from '../util/get-query-string';

const REDIRECT_URL = `${dotenv.SERVER_URL}/auth/facebook-callback`;
const BASE_AUTH_URL = `https://www.facebook.com/v11.0/dialog/oauth`;

class FacebookAuth {
  public get URL(): string {
    const queryString = getQueryString({
      client_id: dotenv.FACEBOOK_CLIENT_ID,
      redirect_uri: REDIRECT_URL,
    });
    return BASE_AUTH_URL + queryString;
  }
}

export default new FacebookAuth();
