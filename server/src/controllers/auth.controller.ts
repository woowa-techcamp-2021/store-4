import { Request, Response } from 'express';
import googleAuth from '../third-party-auth/google';
import facebookAuth from '../third-party-auth/facebook';
import jwtService from '../services/jwt.service';

class AuthController {
  googleLogin(req: Request, res: Response) {
    res.redirect(googleAuth.URL);
  }

  async googleCallback(req: Request, res: Response) {
    try {
      const { code } = req.query;
      const token = await googleAuth.getUserToken(code as string);

      const { email, name } = jwtService.decode(token);
      console.log(token, email, name);

      // check user from DB

      // if new
      // regiseter user

      // res.redirect() to client with token

      res.send('success');
    } catch (err) {
      res.send('fail');
    }
  }

  facebookLogin(req: Request, res: Response) {
    res.redirect(facebookAuth.URL);
  }
}

export default new AuthController();
