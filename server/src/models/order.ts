import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import OrderDetail from './order-detail';
import Timestamp from './timestamp';

@Entity('orders')
class Order extends Timestamp {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  totalPrice!: number;

  @Column()
  address!: string;

  @Column({ name: 'recipient_name' })
  recipientName!: string;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails!: OrderDetail[];
}

export default Order;
