import { Request, Response } from 'express';

class AuthController {
  async googleLogin(req: Request, res: Response) {
    const authURL = ''; // Google auth URL

    res.redirect(authURL);
  }

  async facebookLogin(req: Request, res: Response) {
    const authURL = ''; // Facebook auth URL

    res.redirect(authURL);
  }
}

export default new AuthController();
