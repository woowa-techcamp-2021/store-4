import React, { useState, useCallback, useEffect, useRef } from 'react';
import ProductList from '../components/ProductList/ProductList';
import optionStore from '../stores/optionStore';
import { Option } from '../types/option';
import Product from '../models/product';
import { ProductListOrder } from '../types/product';
import { observer } from 'mobx-react';
import productStore from '../stores/productStore';
import { useHistory } from '../lib/router';
import useWish from '../hooks/useWish';
import useOption from '../hooks/useOption';

export type SortButton = {
  key: ProductListOrder;
  body: string;
};

const SORT_BUTTONS = [
  { key: ProductListOrder.Recommend, body: '추천순' },
  { key: ProductListOrder.Popularity, body: '인기순' },
  { key: ProductListOrder.Recent, body: '최신순' },
  { key: ProductListOrder.PriceLow, body: '낮은가격순' },
  { key: ProductListOrder.PriceHigh, body: '높은가격순' },
];

const ProductListContainer = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const option = optionStore.option;
  const { changeSortOption, changePageNum } = useOption();
  const totalPageCount = useRef(1);
  const totalProductCount = useRef(0);
  const history = useHistory();

  const [getWishClickHandler] = useWish(products, setProducts);

  const fetchProductList = useCallback(async (option: Option) => {
    const {
      products: fetchedProducts,
      totalPages: fetchedTotalPages,
      totalProductCount: fetchedTotalProductCount,
    } = await productStore.fetchProducts(option);

    totalPageCount.current = fetchedTotalPages;
    totalProductCount.current = fetchedTotalProductCount;
    setProducts(fetchedProducts);
  }, []);

  useEffect(() => {
    const option = optionStore.parseQueryToOption(location.search);
    optionStore.init(option);
    fetchProductList(option);
  }, [fetchProductList, history]);

  const handleClickSortButton = useCallback(
    (order: ProductListOrder) => (): void => {
      changeSortOption(order);
    },
    [changeSortOption]
  );

  const handleClickPageNum = useCallback(
    (pageNum: number) => {
      changePageNum(pageNum);
    },
    [changePageNum]
  );

  return (
    <ProductList
      getWishClickHandler={getWishClickHandler}
      products={products}
      buttons={SORT_BUTTONS}
      totalProductCount={totalProductCount.current}
      totalPageCount={totalPageCount.current}
      onClickSortButton={handleClickSortButton}
      onClickPageNum={handleClickPageNum}
      currentPage={option.pageNum}
      searchTerm={option.searchTerm}
    />
  );
};

export default observer(ProductListContainer);
