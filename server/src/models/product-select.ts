import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Product from './product';
import ProductOption from './product-option';

@Entity('product_selects')
class ProductSelect {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => ProductOption, (productOption) => productOption.productSelect)
  productOptions!: ProductOption[];

  @ManyToOne(() => Product, (product) => product.productSelects, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product!: Product;
}

export default ProductSelect;
