import { Column, Entity, JoinColumn, OneToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import Product from './product';

@Entity('categories')
class Category {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Category, (category) => category.childCategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_category_id' })
  parentCategory!: Category | null;

  @OneToMany(() => Category, (category) => category.parentCategory)
  childCategories!: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}

export default Category;
