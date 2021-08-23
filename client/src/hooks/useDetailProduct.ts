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
      content: `
      <img referrerPolicy="no-referrer" src="https://store.baemin.com/data/editor/goods/36b575e3495a6158.jpg"/>
      `,
      productImages: [
        {
          id: 0,
          url: 'https://img.29cm.co.kr/next-product/2020/11/12/9ed60df4fa3642df840615910c94f996_20201112165804.jpg?width=700',
        },
      ],
      reviews: [],
      productSelects: [
        {
          id: 1,
          name: '색상',
          productOptions: [
            { id: 1, name: '화이트', additionalPrice: 2000 },
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

    setTimeout(() => {
      setProduct(product);
    }, 600);
  }, []);

  return product;
};

export default useDetailProduct;
