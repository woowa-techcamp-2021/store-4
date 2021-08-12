import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
  email: string;
  name: string;
}

class JwtService {
  decode(token: string) {
    return jwt.decode(token) as CustomJwtPayload;
  }
}

export default new JwtService();
