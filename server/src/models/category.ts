import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default Category;
