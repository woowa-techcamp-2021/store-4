import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Review from './review';
import Timestamp from './timestamp';
import Wish from './wish';

@Entity('users')
class User extends Timestamp {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  username!: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];

  @OneToMany(() => Wish, (wish) => wish.id)
  wishes!: Review[];
}

export default User;
