import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Product from './product';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToOne(() => Category, (category) => category.parentCategory, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_category_id' })
  parentCategory!: Category | null;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}

export default Category;
