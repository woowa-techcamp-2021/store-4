import buildQueryString from '../utils/build-query-string';
import { isNotNone } from '../utils/typeGuard';

type Headers = { [key: string]: string };
type Querystring = { [key: string]: string };
type Body = unknown;
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type RequestOption = {
  url: string;
  method?: Method;
  headers?: Headers;
  body?: Body;
  query?: Querystring;
};

class HttpError {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

const request = async <T>({
  url,
  method = 'GET',
  headers,
  body,
  query,
}: RequestOption): Promise<T> => {
  const requestURL = isNotNone(query) ? `${url}${buildQueryString(query)}` : url;

  const res = await fetch(requestURL, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  const responseBody = await res.json();

  if (!res.ok) {
    throw new HttpError(res.status, responseBody.message);
  }

  return responseBody;
};

export default request;
