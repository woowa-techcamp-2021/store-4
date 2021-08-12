import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  product!: Product;

  @ManyToOne(() => User, (user) => user.wishes, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user!: User;
}

export default Wish;
