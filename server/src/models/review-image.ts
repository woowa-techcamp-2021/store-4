import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Review from './review';

@Entity('review_images')
class ReviewImage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @ManyToOne(() => Review, (review) => review.reviewImages, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'review_id' })
  review!: Review;
}

export default ReviewImage;
