import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ProductOption from './product-option';

@Entity('product_selects')
class ProductSelect {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => ProductOption, (productOption) => productOption.productSelect)
  productOptions!: ProductOption[];
}

export default ProductSelect;
