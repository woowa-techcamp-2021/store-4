import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ProductImage from './product-image';
import ProductSelect from './product-select';
import Review from './review';
import Timestamp from './timestamp';
import Wish from './wish';

@Entity('products')
class Product extends Timestamp {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  price!: string;

  @Column({ name: 'discount_rate', type: 'tinyint' })
  discountRate!: number;

  @Column({ type: 'text' })
  content!: string;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages!: ProductImage[];

  @OneToMany(() => Review, (review) => review.product)
  reviews!: Review[];

  @OneToMany(() => Wish, (wish) => wish.product)
  wishes!: Wish[];

  @OneToMany(() => ProductSelect, (productSelect) => productSelect.product)
  productSelects!: ProductSelect[];
}

export default Product;
