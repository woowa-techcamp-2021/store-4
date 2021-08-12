import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_selects')
class ProductSelect {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}

export default ProductSelect;
