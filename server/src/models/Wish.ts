import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Product from './product';
import User from './user';

@Entity('wishes')
class Wish {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => Product, (product) => product.wishes, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @ManyToOne(() => User, (user) => user.wishes, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}

export default Wish;
