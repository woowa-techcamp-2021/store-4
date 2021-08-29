import ProductOption from './product-option';

class ProductSelect {
  id: number;
  name: string;
  productOptions: ProductOption[];

  constructor(productSelect: ProductSelect) {
    this.id = productSelect.id;
    this.name = productSelect.name;
    this.productOptions = productSelect.productOptions.map(
      (productOption) => new ProductOption(productOption)
    );
  }
}

export default ProductSelect;
