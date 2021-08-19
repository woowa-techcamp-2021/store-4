import React, { useState, useCallback, useEffect, useRef } from 'react';
import ProductList from '../components/ProductList/ProductList';
import optionStore from '../stores/optionStore';
import { Option } from '../types/option';
import Product from '../models/product';
import { ProductListOrder } from '../types/product';
import { observer } from 'mobx-react';
import productStore from '../stores/productStore';

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
  const [products, setProducts] = useState<Product[]>([] as Product[]);
  const option = optionStore.option;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPageCount = useRef(1);
  const totalProductCount = useRef(0);

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
    fetchProductList(option);
  }, [option, option.category, option.pageNum, option.searchTerm, option.sort, fetchProductList]);

  const handleClickSortButton = useCallback(
    (order: ProductListOrder) => (): void => {
      optionStore.setSortOption(order);
    },
    []
  );

  const handleClickPageNum = useCallback(
    (pageNum: number) => () => {
      optionStore.setPageNum(pageNum);
      setCurrentPage(pageNum);
    },
    []
  );

  return (
    <ProductList
      products={products}
      buttons={SORT_BUTTONS}
      totalProductCount={totalProductCount.current}
      totalPageCount={totalPageCount.current}
      onClickSortButton={handleClickSortButton}
      onClickPageNum={handleClickPageNum}
      currentPage={currentPage}
    />
  );
};

export default observer(ProductListContainer);
