import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ReviewImage from './review-image';
import Timestamp from './timestamp';

@Entity('reviews')
class Review extends Timestamp {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'tinyint' })
  point!: number;

  @OneToMany(() => ReviewImage, (reviewImage) => reviewImage.review)
  reviewImages!: ReviewImage[];
}

export default Review;
