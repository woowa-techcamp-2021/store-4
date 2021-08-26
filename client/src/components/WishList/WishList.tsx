import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WishItem from './WishItem/WishItem';
import { Wish } from '../../types/Wish';
import { getWishList } from './mock';

const Container = styled.div`
  width: 800px;
`;

const WishText = styled.h3`
  font-size: ${(props) => props.theme.fontSize.medium};
  font-weight: 600;
  padding-bottom: 10px;
`;

const TableMain = styled.div`
  display: flex;
  align-items: center;
`;

const WishItemList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const WishList = (): JSX.Element => {
  const [wishItems, setWishItems] = useState<Wish[]>([]);

  useEffect(() => {
    const wishedProductList = getWishList(); // 찜목록 api 요청
    const nextWishList = wishedProductList.map((item) => {
      return {
        id: item.id,
        title: item.title,
        imgSrc: item.imgSrc,
      };
    });
    setWishItems(nextWishList);
  }, []);

  const WishItems = wishItems.map((wishItem) => <WishItem key={wishItem.id} wishItem={wishItem} />);

  return (
    <Container>
      <WishText>찜리스트</WishText>
      <TableMain>
        <WishItemList>{WishItems}</WishItemList>
      </TableMain>
    </Container>
  );
};

export default WishList;
