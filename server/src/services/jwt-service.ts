import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from '../config/dotenv';

interface CustomJwtPayload extends JwtPayload {
  id: number;
  email: string;
  name: string;
}

class JwtService {
  generateToken(payload: CustomJwtPayload) {
    return jwt.sign(payload, dotenv.JWT_SECRET, {
      expiresIn: dotenv.JWT_EXPIRES_IN,
    });
  }

  decode(token: string) {
    return jwt.decode(token) as CustomJwtPayload;
  }

  verify(token: string) {
    return jwt.verify(token, dotenv.JWT_SECRET) as CustomJwtPayload;
  }
}

export default new JwtService();
