import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import Timestamp from './timestamp';

@Entity('reviews')
class Review extends Timestamp {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'tinyint' })
  point!: number;
}

export default Review;
