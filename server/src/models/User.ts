import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import Timestamp from './timestamp';

@Entity('users')
class User extends Timestamp {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ name: 'phone_number' })
  phoneNumber!: string;

  @Column()
  username!: string;

  @Column({ type: 'date' })
  birth!: string;
}

export default User;
