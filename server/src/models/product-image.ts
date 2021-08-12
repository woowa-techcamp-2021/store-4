import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Product from './product';

@Entity('product_images')
class ProductImage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @ManyToOne(() => Product, (product) => product.productImages, {
    onDelete: 'CASCADE',
  })
  product!: Product;
}

export default ProductImage;
