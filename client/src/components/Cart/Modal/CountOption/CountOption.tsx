import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { toKoreanMoneyFormatPure } from '../../../../utils/moneyFormater';
import cartStore from '../../../../stores/cartStore';
import { observer } from 'mobx-react';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';

const CountOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  background-color: ${(props) => props.theme.color.grey1};
`;
const CountWrapperProductTitle = styled.div`
  flex-grow: 6;
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: 600;
`;
const CounterWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Input = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const CountInput = styled(Input)`
  width: 43px;
  height: 34px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  text-align: center;
  border: 1px solid ${(props) => props.theme.color.grey3};
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const CountButtons = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const CountUpButton = styled(Button)`
  width: 23px;
  height: 17px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  color: ${(props) => props.theme.color.grey4};
  background-color: ${(props) => props.theme.color.white1};
  border: 1px solid ${(props) => props.theme.color.grey3};
`;
const CountDownButton = styled(Button)`
  width: 23px;
  height: 17px;
  color: ${(props) => props.theme.color.grey4};
  font-size: ${(props) => props.theme.fontSize.tiny};
  background-color: ${(props) => props.theme.color.white1};
  border: 1px solid ${(props) => props.theme.color.grey3};
`;

const ProductTotalPrice = styled.div`
  flex-grow: 1;
  font-size: ${(props) => props.theme.fontSize.small};
`;

const PriceNumber = styled.span`
  font-weight: 600;
`;

type Props = {
  productCount: number;
  setProductCount: Dispatch<SetStateAction<number>>;
};

const CountOption = (props: Props): JSX.Element => {
  const modalCartItem = cartStore.getModalCartItem();
  const title = modalCartItem.title;
  const price = modalCartItem.price;

  const onChangeCountInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.setProductCount(parseInt(e.target.value));
  };

  const onClickPlus = () => {
    props.setProductCount(props.productCount + 1);
  };

  const onClickMinus = () => {
    if (props.productCount <= 0) return;
    props.setProductCount(props.productCount - 1);
  };

  return (
    <CountOptionWrapper>
      <CountWrapperProductTitle>{title}</CountWrapperProductTitle>
      <CounterWrapper>
        <CountInput
          type="number"
          value={props.productCount !== 0 ? props.productCount : ''}
          onChange={onChangeCountInput}
        />
        <CountButtons>
          <CountUpButton onClick={onClickPlus}>ᐱ</CountUpButton>
          <CountDownButton onClick={onClickMinus}>ᐯ</CountDownButton>
        </CountButtons>
      </CounterWrapper>
      <ProductTotalPrice>
        <PriceNumber>{toKoreanMoneyFormatPure(price * props.productCount)}</PriceNumber>원
      </ProductTotalPrice>
    </CountOptionWrapper>
  );
};

export default observer(CountOption);
