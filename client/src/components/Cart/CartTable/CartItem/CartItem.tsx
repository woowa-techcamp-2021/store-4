import React from 'react';
import styled from 'styled-components';

import cartStore from '../../../../stores/cartStore';
import { toKoreanMoneyFormat } from '../../../../utils/moneyFormater';

const AlignCenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResetButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const CartItemWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 82px;
  &:not(:first-child) {
    border-top: 1px solid ${(props) => props.theme.color.grey3};
  }
`;

const ItemTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 802px;
  padding: 0 10px;
`;

const CheckBoxWrapper = styled(AlignCenterContainer)`
  width: 38px;
`;

const CheckBox = styled.input``;

const ItemImg = styled.img`
  width: 52px;
  height: 52px;
  padding-right: 10px;
`;

const ItemTitle = styled.div``;

const CountWrapper = styled(AlignCenterContainer)`
  flex-direction: column;
  width: 120px;
`;

const Count = styled.div`
  padding-bottom: 7px;
`;

const OptionChangeButton = styled(ResetButton)`
  width: 90px;
  height: 23px;
  border: 1px solid ${(props) => props.theme.color.grey2};
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: 400;
`;

const PriceWrapper = styled(AlignCenterContainer)`
  width: 120px;
`;

const Price = styled(AlignCenterContainer)``;

type Props = {
  onOptionClick: (id: number) => void;
  id: number;
  title: string;
  imgSrc: string;
  count: number;
  price: number;
  isSelected: boolean;
};

const CartItem = (props: Props): JSX.Element => {
  const { onOptionClick, id, title, imgSrc, count, price, isSelected } = props;

  const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    cartStore.setCartItemSelection(id, e.target.checked);
  };

  return (
    <CartItemWrapper>
      <CheckBoxWrapper>
        <CheckBox type="checkbox" onChange={onChangeCheckBox} checked={isSelected} />
      </CheckBoxWrapper>
      <ItemTitleWrapper>
        <ItemImg src={imgSrc} />
        <ItemTitle>{title}</ItemTitle>
      </ItemTitleWrapper>
      <CountWrapper>
        <Count>{count}개</Count>
        <OptionChangeButton
          onClick={() => {
            onOptionClick(id);
          }}
        >
          옵션/수량
        </OptionChangeButton>
      </CountWrapper>
      <PriceWrapper>
        <Price>{toKoreanMoneyFormat(price)}</Price>
      </PriceWrapper>
    </CartItemWrapper>
  );
};

export default CartItem;
