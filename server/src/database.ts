import { Connection, ConnectionOptions, createConnection } from 'typeorm';

class Database {
  private config: ConnectionOptions;

  constructor(config: ConnectionOptions) {
    this.config = config;
  }

  connect(): Promise<Connection> {
    return createConnection(this.config);
  }
}

export default Database;
