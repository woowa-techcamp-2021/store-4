import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ProductImage from './product-image';
import Timestamp from './timestamp';

@Entity('products')
class Product extends Timestamp {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  price!: string;

  @Column({ type: 'tinyint' })
  discountRate!: number;

  @Column({ type: 'text' })
  content!: string;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages!: ProductImage[];
}

export default Product;
