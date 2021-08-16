import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Product from './product';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn()
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
