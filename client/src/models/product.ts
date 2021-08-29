import ProductImage from './product-image';
import ProductOption from './product-option';
import ProductSelect from './product-select';
import Review from './review';

const MILLISECONDS_IN_A_MONTH = 30 * 24 * 60 * 60 * 1000;

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
  isOrdered: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(product: ProductAttributes) {
    this.id = product.id;
    this.name = product.name;
    this.price = Number(product.price);
    this.discountRate = Number(product.discountRate);
    this.content = product.content;
    this.productImages = product.productImages
      ? product.productImages.map((productImage) => new ProductImage(productImage))
      : [];
    this.reviews = product.reviews ? product.reviews.map((review) => new Review(review)) : [];
    this.productSelects = product.productSelects
      ? product.productSelects.map((productSelect) => new ProductSelect(productSelect))
      : [];
    this.isWished = product.isWished;
    this.isOrdered = product.isOrdered;
    this.createdAt = new Date(product.createdAt);
    this.updatedAt = new Date(product.updatedAt);
  }
}

class Product extends ProductAttributes {
  get discountedPrice(): number {
    return this.price * (1 - this.discountRate / 100);
  }

  get isDiscounting(): boolean {
    return this.discountRate > 0 ? true : false;
  }

  get isNew(): boolean {
    const beforeOneMonth = Date.now() - MILLISECONDS_IN_A_MONTH;
    return this.createdAt.getTime() > beforeOneMonth;
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
