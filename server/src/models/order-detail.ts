import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Order from './order';
import Product from './product';

@Entity('order_details')
class OrderDetail {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'discount_rate', type: 'tinyint', default: 0 })
  discountRate!: number;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  price!: number;

  @Column({ type: 'tinyint' })
  quantity!: number;

  @Column()
  option!: string;

  @ManyToOne(() => Order, (order) => order.orderDetails, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'product_id' })
  product!: Product | null;
}

export default OrderDetail;
