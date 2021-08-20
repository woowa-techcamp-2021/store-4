import { useEffect, useState } from 'react';
import Product from '../models/product';

const useDetailProduct = (): Product | null => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const product = new Product({
      id: 1,
      name: '상품',
      price: 10000,
      discountRate: 10,
      content: '상품 정보',
      productImages: [],
      reviews: [],
      productSelects: [
        {
          id: 1,
          name: '색상',
          productOptions: [
            { id: 1, name: '화이트', additionalPrice: 0 },
            { id: 2, name: '블랙', additionalPrice: 0 },
          ],
        },
        {
          id: 2,
          name: '사이즈',
          productOptions: [
            { id: 3, name: 'L', additionalPrice: 0 },
            { id: 4, name: 'M', additionalPrice: 0 },
          ],
        },
      ],
      isWished: false,
      createdAt: new Date(2021, 0, 1),
      updatedAt: new Date(2021, 0, 1),
    });

    setProduct(product);
  }, []);

  return product;
};

export default useDetailProduct;
