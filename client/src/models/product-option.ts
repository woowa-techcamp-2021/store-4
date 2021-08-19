class ProductOption {
  id: number;
  name: string;
  additionalPrice: number;

  constructor(productOption: ProductOption) {
    this.id = productOption.id;
    this.name = productOption.name;
    this.additionalPrice = productOption.additionalPrice;
  }
}

export default ProductOption;
