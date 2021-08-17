import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import OrderDetail from './order-detail';
import Timestamp from './timestamp';
import User from './user';

@Entity('orders')
class Order extends Timestamp {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 0 })
  totalPrice!: number;

  @Column()
  address!: string;

  @Column({ name: 'recipient_name' })
  recipientName!: string;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails!: OrderDetail[];

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User | null;
}

export default Order;
