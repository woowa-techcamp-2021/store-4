import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Product from './product';
import ReviewImage from './review-image';
import Timestamp from './timestamp';
import User from './user';

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

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User | null;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'product_id' })
  product!: Product;
}

export default Review;
