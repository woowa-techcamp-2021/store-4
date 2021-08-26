import { Dispatch, MouseEventHandler, SetStateAction, useCallback } from 'react';
import { useHistory } from '../lib/router';
import Product from '../models/product';
import wishStore from '../stores/wishStore';

type UseWish = [(product: Product) => MouseEventHandler];

const useWish = (
  products: Product[],
  setProducts: Dispatch<SetStateAction<Product[]>>
): UseWish => {
  const history = useHistory();

  const handleGetWishClickHandler = useCallback(
    (product: Product): MouseEventHandler =>
      (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (localStorage.getItem('token') === null) {
          alert('로그인이 필요합니다');
          return;
        }

        const productIndex = products.findIndex((loopProduct) => loopProduct.id === product.id);

        if (productIndex === -1) {
          return;
        }

        setProducts([
          ...products.slice(0, productIndex),
          new Product({
            ...product,
            isWished: !product.isWished,
          }),
          ...products.slice(productIndex + 1),
        ]);

        wishStore.changeWishedTo(product.id, !product.isWished).catch((error) => {
          switch (error.status) {
            case 401:
            case 410:
              alert('세션이 만료되었습니다');
              history.push('/logout');
              return;

            case 404:
              history.push('/notfound');
              return;

            case 500:
              history.push('/error');
              return;
          }
        });
      },
    [history, products, setProducts]
  );

  return [handleGetWishClickHandler];
};

export default useWish;
