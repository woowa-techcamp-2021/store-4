class Category {
  id!: number;
  name!: string;
  parentCategory!: Category | null;
  childCategories!: Category[];

  constructor(data: Category) {
    this.id = data.id;
    this.name = data.name;
    this.parentCategory = data.parentCategory && new Category(data.parentCategory);
    this.childCategories = data.childCategories.map((childCategory) => new Category(childCategory));
  }

  get isRoot(): boolean {
    return this.parentCategory === null;
  }
}

export default Category;
