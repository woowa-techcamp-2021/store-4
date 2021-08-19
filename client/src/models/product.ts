import ProductImage from './product-image';
import ProductOption from './product-option';
import ProductSelect from './product-select';
import Review from './review';

class ProductAttributes {
  id: number;
  name: string;
  price: number;
  discountRate: number;
  content: string;
  productImages: ProductImage[];
  reviews: Review[];
  productSelects: ProductSelect[];
  isWished: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(product: ProductAttributes) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.discountRate = product.discountRate;
    this.content = product.content;
    this.productImages = product.productImages
      ? product.productImages.map((productImage) => new ProductImage(productImage))
      : [];
    this.reviews = product.reviews ? product.reviews.map((review) => new Review(review)) : [];
    this.productSelects = product.productSelects
      ? product.productSelects.map((productSelect) => new ProductSelect(productSelect))
      : [];
    this.isWished = product.isWished;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }
}

class Product extends ProductAttributes {
  get discountedPrice(): number {
    return this.price * (1 - this.discountRate / 100);
  }

  get isDiscountRate(): boolean {
    return this.discountRate > 0 ? true : false;
  }

  get thumbnail(): string | null {
    if (this.productImages.length <= 0) {
      return null;
    }

    return this.productImages[0].url;
  }

  calcTotalPrice(productOptions: ProductOption[]): number {
    const totalAdditionalPrice = productOptions.reduce(
      (totalPrice, option) => totalPrice + option.additionalPrice,
      0
    );

    return this.discountedPrice + totalAdditionalPrice;
  }
}

export default Product;
