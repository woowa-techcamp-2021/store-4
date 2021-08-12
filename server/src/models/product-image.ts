import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_images')
class ProductImage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;
}

export default ProductImage;
