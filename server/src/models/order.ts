import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}

export default Order;
