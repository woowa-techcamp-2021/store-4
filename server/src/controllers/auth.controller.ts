import { Request, Response } from 'express';
import googleAuth from '../third-party-auth/google';

class AuthController {
  googleLogin(req: Request, res: Response) {
    res.redirect(googleAuth.URL);
  }

  async facebookLogin(req: Request, res: Response) {
    const authURL = ''; // Facebook auth URL

    res.redirect(authURL);
  }
}

export default new AuthController();
