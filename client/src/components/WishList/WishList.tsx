import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WishItem from './WishItem/WishItem';
import { Wish, WishResponse } from '../../types/Wish';
import wishStore from '../../stores/wishStore';

import EmptyMessageBox from './EmptyMessageBox/EmptyMessageBox';

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
    wishStore.fetchWishList().then((wishList: WishResponse[]) => {
      const nextWishList = wishList.map((wish) => {
        return {
          id: wish.id,
          productId: wish.product.id,
          title: wish.product.name,
          imgSrc: wish.product.productImages[0].url,
        };
      });
      setWishItems(nextWishList);
    });
  }, []);

  const WishItems = wishItems.map((wishItem) => (
    <WishItem
      key={wishItem.productId}
      productId={wishItem.productId}
      title={wishItem.title}
      imgSrc={wishItem.imgSrc}
    />
  ));

  return (
    <Container>
      <WishText>찜리스트</WishText>
      <TableMain>
        {wishItems.length > 0 ? (
          <WishItemList>{WishItems}</WishItemList>
        ) : (
          <EmptyMessageBox></EmptyMessageBox>
        )}
      </TableMain>
    </Container>
  );
};

export default WishList;
