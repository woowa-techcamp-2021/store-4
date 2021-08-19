declare namespace Express {
  export interface Request {
    decoded?: {
      id: number;
      email: string;
      name: string;
    };
  }
}
