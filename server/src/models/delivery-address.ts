import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Timestamp from './timestamp';
import User from './user';

@Entity('delivery_addresses')
class DeliveryAddress extends Timestamp {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ name: 'recipient_name' })
  recipientName!: string;

  @Column()
  address!: string;

  @Column({ name: 'recipient_phone_number' })
  recipientPhoneNumber!: string;

  @ManyToOne(() => User, (user) => user.deliveryAddresses, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}

export default DeliveryAddress;
