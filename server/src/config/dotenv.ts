import 'dotenv/config';

const loadEnv = (key: string): string => {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`환경변수 ${key}가 정의 되지 않음`);
  }

  return value;
};

export default {
  PORT: loadEnv('PORT'),
  MYSQL_HOST: loadEnv('MYSQL_HOST'),
  MYSQL_PORT: loadEnv('MYSQL_PORT'),
  MYSQL_USERNAME: loadEnv('MYSQL_USERNAME'),
  MYSQL_PASSWORD: loadEnv('MYSQL_PASSWORD'),
  MYSQL_DATABASE: loadEnv('MYSQL_DATABASE'),
  MYSQL_SYNC: loadEnv('MYSQL_SYNC'),
  JWT_SECRET: loadEnv('JWT_SECRET'),
  JWT_EXPIRES_IN: loadEnv('JWT_EXPIRES_IN'),
  CLIENT_URL: loadEnv('CLIENT_URL'),
  SERVER_URL: loadEnv('SERVER_URL'),
  GOOGLE_CLIENT_ID: loadEnv('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: loadEnv('GOOGLE_CLIENT_SECRET'),
  FACEBOOK_CLIENT_ID: loadEnv('FACEBOOK_CLIENT_ID'),
  FACEBOOK_CLIENT_SECRET: loadEnv('FACEBOOK_CLIENT_SECRET'),
  AWS_ACCESS_KEY: loadEnv('AWS_ACCESS_KEY'),
  AWS_SECRET: loadEnv('AWS_SECRET'),
  AWS_S3_BUCKET: loadEnv('AWS_S3_BUCKET'),
};
