import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_options')
class ProductOption {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ name: 'additional_price', type: 'decimal', precision: 10, scale: 0 })
  additionalPrice!: number;
}

export default ProductOption;
