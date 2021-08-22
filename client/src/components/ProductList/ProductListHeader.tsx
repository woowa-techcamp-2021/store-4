import React from 'react';
import styled from 'styled-components';
import { SortButton } from '../../containers/ProductListContainer';
import { ProductListOrder } from '../../types/product';
import SortButtonList from './SortButtonList';

const ListHeader = styled.div`
  box-sizing: border-box;
  width: 1200px;
  display: flex;
  justify-content: space-between;
  margin: 32px 0px;
`;

const ListHeaderLeft = styled.div`
  font-weight: 600;
`;

const TotalCount = styled.div``;

type Props = {
  searchTerm: string | null;
  totalProductCount: number;
  buttons: SortButton[];
  onClickSortButton: (option: ProductListOrder) => () => void;
};

const ProductListHeader = (props: Props): JSX.Element => {
  const { searchTerm, totalProductCount, buttons, onClickSortButton } = props;
  return (
    <ListHeader>
      {searchTerm ? (
        <ListHeaderLeft data-testid="listHeaderLeft">
          {`"${searchTerm}" 검색결과 ${totalProductCount}개`}
        </ListHeaderLeft>
      ) : (
        <TotalCount data-testid="totalCount">총 {totalProductCount}개</TotalCount>
      )}
      <SortButtonList buttons={buttons} onClickSortButton={onClickSortButton} />
    </ListHeader>
  );
};

export default ProductListHeader;
