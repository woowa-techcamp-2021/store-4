import { Request, Response } from 'express';
import googleAuth from '../third-party-auth/google';
import facebookAuth from '../third-party-auth/facebook';
import jwtService from '../services/jwt-service';
import userService from '../services/user-service';
import dotenv from '../config/dotenv';
import { isNone } from '../util/type-guard';
import UserNotfoundException from '../exceptions/user-notfound-exception';

let DEMO_USER_COUNT = 1;

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
  }

  facebookLogin(req: Request, res: Response) {
    res.redirect(facebookAuth.URL);
  }

  async facebookCallback(req: Request, res: Response) {
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
  }

  async demoLogin(req: Request, res: Response) {
    const demoUser = await userService.registerUser({
      username: `게스트`,
      email: `guest-${DEMO_USER_COUNT}@woowa.store`,
    });

    DEMO_USER_COUNT++;

    const token = jwtService.generateToken({
      id: demoUser.id,
      name: demoUser.username,
      email: demoUser.email,
    });

    res.redirect(`${dotenv.CLIENT_URL}?token=${token}`);
  }
}

export default new AuthController();
