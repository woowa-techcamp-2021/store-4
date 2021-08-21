import React from 'react';
import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import MOCK_IMG from '../../../../assets/images/towel.png';
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
  onOptionClick: MouseEventHandler;
};

const CartItem = (props: Props): JSX.Element => {
  const { onOptionClick } = props;

  return (
    <CartItemWrapper>
      <CheckBoxWrapper>
        <CheckBox type="checkbox" />
      </CheckBoxWrapper>
      <ItemTitleWrapper>
        <ItemImg src={MOCK_IMG} />
        <ItemTitle>업사이클링 스탠드그립 세트. 맥주</ItemTitle>
      </ItemTitleWrapper>
      <CountWrapper>
        <Count>1개</Count>
        <OptionChangeButton onClick={onOptionClick}>옵션/수량</OptionChangeButton>
      </CountWrapper>
      <PriceWrapper>
        <Price>{toKoreanMoneyFormat(18900)}</Price>
      </PriceWrapper>
    </CartItemWrapper>
  );
};

export default CartItem;
