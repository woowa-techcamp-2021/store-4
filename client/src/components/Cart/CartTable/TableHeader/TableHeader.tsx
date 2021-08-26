import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import cartStore from '../../../../stores/cartStore';

const AlignCenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  border-top: 1px solid ${(props) => props.theme.color.black};
  border-bottom: 1px solid ${(props) => props.theme.color.grey3};
  background-color: ${(props) => props.theme.color.grey1};
`;

const HeaderCheckBox = styled.input`
  width: 38px;
`;
const HeaderTitle = styled(AlignCenterContainer)`
  width: 100%;
`;
const HeaderCount = styled(AlignCenterContainer)`
  width: 120px;
`;
const HeaderPrice = styled(AlignCenterContainer)`
  width: 120px;
`;

const TableHeader = (): JSX.Element => {
  const { cartItemList } = cartStore;
  const isAllSelected = cartItemList.every((cartItem) => cartItem.isSelected);

  const onClickCheckBox = () => {
    cartStore.setCartItemSelectionAll(!isAllSelected);
  };

  return (
    <Container>
      <HeaderCheckBox
        type="checkbox"
        checked={isAllSelected}
        onChange={onClickCheckBox}
      ></HeaderCheckBox>
      <HeaderTitle>상품/옵션 정보</HeaderTitle>
      <HeaderCount>수량</HeaderCount>
      <HeaderPrice>상품금액</HeaderPrice>
    </Container>
  );
};

export default observer(TableHeader);
