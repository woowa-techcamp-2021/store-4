import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
  email: string;
  name: string;
}

const TOKEN_EXPIRE = '2h';

class JwtService {
  generate(payload: CustomJwtPayload, key: string) {
    return jwt.sign(payload, key, {
      expiresIn: TOKEN_EXPIRE,
    });
  }

  decode(token: string) {
    return jwt.decode(token) as CustomJwtPayload;
  }
}

export default new JwtService();
