import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviews')
class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'tinyint' })
  point!: number;
}

export default Review;
