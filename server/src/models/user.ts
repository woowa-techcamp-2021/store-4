import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import DeliveryAddress from './delivery-address';
import Order from './order';
import Review from './review';
import Timestamp from './timestamp';
import Wish from './wish';

@Entity('users')
class User extends Timestamp {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  username!: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];

  @OneToMany(() => Wish, (wish) => wish.user)
  wishes!: Wish[];

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToMany(() => DeliveryAddress, (deliveryAddress) => deliveryAddress.user)
  deliveryAddresses!: DeliveryAddress[];

  @OneToOne(() => DeliveryAddress, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'default_delivery_address_id' })
  defaultDeliveryAddress!: DeliveryAddress | null;
}

export default User;
