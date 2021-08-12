import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

class Timestamp {
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;
}

export default Timestamp;
