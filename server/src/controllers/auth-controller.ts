import { Request, Response } from 'express';
import googleAuth from '../third-party-auth/google';
import facebookAuth from '../third-party-auth/facebook';
import jwtService from '../services/jwt-service';
import userService from '../services/user-service';
import dotenv from '../config/dotenv';
import { isNone } from '../util/type-guard';
import UserNotfoundException from '../exceptions/user-notfound-exception';

class AuthController {
  async getUser(req: Request, res: Response) {
    const user = req.decoded;
    if (isNone(user)) {
      throw new UserNotfoundException('유저를 찾지 못했습니다');
    }

    res.status(200).json({ user });
  }

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
