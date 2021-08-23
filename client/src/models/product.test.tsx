import Product from './product';
import ProductImage from './product-image';
import ProductOption from './product-option';

describe('Product 모델', () => {
  const MOCK_PRODUCT = new Product({
    id: 1,
    name: '상품',
    price: 10000,
    discountRate: 10,
    content: '상품 정보',
    productImages: [],
    reviews: [],
    productSelects: [],
    isWished: false,
    createdAt: new Date(2021, 0, 1),
    updatedAt: new Date(2021, 0, 1),
  });

  const IMAGES = [
    new ProductImage({ id: 1, url: 'image1' }),
    new ProductImage({ id: 2, url: 'image2' }),
  ];

  const OPTIONS = [
    new ProductOption({ id: 1, name: '옵션1', additionalPrice: 1000 }),
    new ProductOption({ id: 1, name: '옵션2', additionalPrice: 2000 }),
  ];

  const DISCOUNTED_PRICE = 9000;
  const TOTAL_PRICE = 12000;

  test('할인가 계산', () => {
    expect(MOCK_PRODUCT.discountedPrice).toBe(DISCOUNTED_PRICE);
  });

  test('썸네일이 없을경우 null 반환', () => {
    expect(MOCK_PRODUCT.thumbnail).toBe(null);
  });

  test('썸네일이 있을경우 첫번째 요소 반환', () => {
    const MOCK_WITH_THUMBNAIL = new Product({
      ...MOCK_PRODUCT,
    });
    MOCK_WITH_THUMBNAIL.productImages = IMAGES;

    expect(MOCK_WITH_THUMBNAIL.thumbnail).toBe(IMAGES[0].url);
  });

  test('전체 가격 계산', () => {
    expect(MOCK_PRODUCT.calcTotalPrice(OPTIONS)).toBe(TOTAL_PRICE);
  });
});
