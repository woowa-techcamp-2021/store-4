import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_details')
class OrderDetail {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'discount_rate', type: 'tinyint' })
  discountRate!: number;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  price!: number;

  @Column({ type: 'tinyint' })
  quantity!: number;

  @Column()
  option!: string;
}

export default OrderDetail;
