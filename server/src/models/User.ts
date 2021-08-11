import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
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

  @CreateDateColumn({ name:"created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name:"updated_at" })
  updatedAt!: Date;
}

export default User;
