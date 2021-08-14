import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Category from './category';
import OrderDetail from './order-detail';
import ProductImage from './product-image';
import ProductSelect from './product-select';
import Review from './review';
import Timestamp from './timestamp';
import Wish from './wish';

@Entity({ name: 'products', orderBy: { updated_at: 'DESC' } })
class Product extends Timestamp {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  price!: string;

  @Column({ name: 'discount_rate', type: 'tinyint', default: 0 })
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

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails!: OrderDetail[];

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category!: Category | null;
}

export default Product;
