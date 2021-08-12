import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import Timestamp from './timestamp';

@Entity('products')
class Product extends Timestamp {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  price!: string;

  @Column({ type: 'tinyint' })
  discountRate!: number;

  @Column({ type: 'text' })
  content!: string;
}

export default Product;
