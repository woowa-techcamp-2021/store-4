declare namespace Express {
  export interface Request {
    decoded: {
      email: string;
      name: string;
    };
  }
}
