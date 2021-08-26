import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WishItem from './WishItem/WishItem';
import TableHeader from './WishItem/TableHeader/TableHeader';
import { Wish } from '../../types/Wish';
import { isNone } from '../../utils/typeGuard';
import { getWishList, cancelWish } from './mock';

const ResetButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const Container = styled.div`
  width: 960px;
`;

const WishText = styled.h3`
  font-size: ${(props) => props.theme.fontSize.normal};
  font-weight: 600;
  padding-bottom: 10px;
`;

const TableMain = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.color.grey3};
`;

const WishItemList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;
const RemoveButton = styled(ResetButton)`
  width: 120px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.color.grey3};
  margin-right: 8px;
  font-size: ${(props) => props.theme.fontSize.tiny};
`;

const WishList = (): JSX.Element => {
  const [wishItems, setWishItems] = useState<Wish[]>([]);

  useEffect(() => {
    const wishedProductList = getWishList(); // 찜목록 api 요청
    const nextWishList = [];
    for (const item of wishedProductList) {
      nextWishList.push({ ...item, checked: false });
    }
    setWishItems(nextWishList);
  }, []);

  const setCheckBox = (id: number, checked: boolean) => {
    const nextWishItems = [...wishItems];
    const changedItem = nextWishItems.find((item) => item.id === id);
    if (isNone(changedItem)) {
      return;
    }

    changedItem.checked = checked;
    setWishItems(nextWishItems);
  };

  const setCheckBoxAll = (checked: boolean) => {
    const nextWishItems = [...wishItems];
    for (const item of nextWishItems) {
      item.checked = checked;
    }

    setWishItems(nextWishItems);
  };

  const cancelSelectedWish = () => {
    // 찜하기 취소 api 요청.
    for (const item of wishItems) {
      if (item.checked) {
        cancelWish(item.id);
      }
    }

    const wishedProductList = getWishList(); // 취소 이후 다시 찜목록 api 요청해서 받아오기.
    const nextWishList = [];
    for (const item of wishedProductList) {
      nextWishList.push({ ...item, checked: false });
    }
    setWishItems(nextWishList);
  };

  const WishItems = wishItems.map((wishItem) => (
    <WishItem key={wishItem.id} wishItem={wishItem} setCheckBox={setCheckBox} />
  ));

  return (
    <Container>
      <WishText>찜리스트</WishText>
      <TableHeader wishItems={wishItems} setCheckBoxAll={setCheckBoxAll} />
      <TableMain>
        <WishItemList>{WishItems}</WishItemList>
      </TableMain>
      <ButtonWrapper>
        <RemoveButton onClick={cancelSelectedWish}>선택 상품 삭제</RemoveButton>
      </ButtonWrapper>
    </Container>
  );
};

export default WishList;
