import { Request, Response } from 'express';
import googleAuth from '../third-party-auth/google';
import facebookAuth from '../third-party-auth/facebook';
import jwtService from '../services/jwt-service';
import userService from '../services/user-service';
import dotenv from '../config/dotenv';

class AuthController {
  googleLogin(req: Request, res: Response) {
    res.redirect(googleAuth.URL);
  }

  async googleCallback(req: Request, res: Response) {
    try {
      const { code } = req.query;
      const idToken = await googleAuth.getUserToken(code as string);
      const { email, name } = jwtService.decode(idToken);

      let user = await userService.checkUserByEmail(email);
      if (user === undefined) {
        user = await userService.registerUser({ username: name, email });
      }

      const token = jwtService.generateToken({
        id: user.id,
        name: user.username,
        email: user.email,
      });

      res.redirect(`${dotenv.CLIENT_URL}?token=${token}`);
    } catch (err) {
      // 임시 에러 처리
      console.error(err);
      res.send('fail');
    }
  }

  facebookLogin(req: Request, res: Response) {
    res.redirect(facebookAuth.URL);
  }

  async facebookCallback(req: Request, res: Response) {
    try {
      const { code } = req.query;
      const { email, name } = await facebookAuth.getUserData(code as string);

      let user = await userService.checkUserByEmail(email);
      if (user === undefined) {
        user = await userService.registerUser({ username: name, email });
      }

      const token = jwtService.generateToken({
        id: user.id,
        name: user.username,
        email: user.email,
      });

      res.redirect(`${dotenv.CLIENT_URL}?token=${token}`);
    } catch (err) {
      // 임시 에러 처리
      console.error(err);
      res.send('fail');
    }
  }
}

export default new AuthController();
