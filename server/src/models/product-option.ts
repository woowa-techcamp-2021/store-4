import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import ProductSelect from './product-select';

@Entity('product_options')
class ProductOption {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ name: 'additional_price', type: 'decimal', precision: 10, scale: 0 })
  additionalPrice!: number;

  @ManyToOne(() => ProductSelect, (productSelect) => productSelect.productOptions, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'product_select_id' })
  productSelect!: ProductSelect;
}

export default ProductOption;
