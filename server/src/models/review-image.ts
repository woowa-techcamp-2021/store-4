import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('review_images')
class ReviewImage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;
}

export default ReviewImage;
