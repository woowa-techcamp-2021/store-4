import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

class Timestamp {
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;
}

export default Timestamp;
