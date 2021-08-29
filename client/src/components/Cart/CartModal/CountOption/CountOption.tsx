import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { toKoreanMoneyFormatPure } from '../../../../utils/moneyFormater';
import cartStore from '../../../../stores/cartStore';
import { observer } from 'mobx-react';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import CartItem, { STOCK } from '../../../../models/cart-item';
import { toJS } from 'mobx';
import { getSelectedOptionPriceList } from '../../helper';
import ProductCounter from './ProductCounter';
import { isNotPositiveInteger } from '../../../../utils/typeGuard';
import toast from '../../../../lib/toast';

const Container = styled.div`
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

const ProductTotalPrice = styled.div`
  flex-grow: 1;
  font-size: ${(props) => props.theme.fontSize.small};
  min-width: 110px;
  padding-right: 10px;

  text-align: end;
`;

const PriceNumber = styled.span`
  font-weight: 600;
`;

const CounterWrapper = styled.div`
  padding-right: 30px;
`;

type Props = {
  productCount: number;
  setProductCount: Dispatch<SetStateAction<number>>;
};

const CountOption = (props: Props): JSX.Element => {
  const { productCount, setProductCount } = props;

  const modalCartItem = cartStore.getModalCartItem();
  const toJSModalCartItem = toJS(modalCartItem);
  if (!CartItem.isCartItem(toJSModalCartItem)) {
    return <Container></Container>;
  }

  const { title, price, selectWithSelecteds } = toJSModalCartItem;
  const optionPriceList = getSelectedOptionPriceList(selectWithSelecteds);

  const totalPrice = Number.isInteger(productCount)
    ? (price + optionPriceList.reduce((total, current) => total + current, 0)) * productCount
    : 0;

  const onChangeProductCount = (nextCount: unknown) => {
    if (isNotPositiveInteger(nextCount)) {
      return;
    }

    if (nextCount > STOCK) {
      toast.info(`현재 구매 가능한 최대 수량은 ${STOCK}개입니다`);

      return setProductCount(STOCK);
    }

    setProductCount(nextCount);
  };

  const onChangeCountInput = (e: ChangeEvent<HTMLInputElement>) =>
    onChangeProductCount(+e.target.value);

  const onClickPlus = () => onChangeProductCount(productCount + 1);

  const onClickMinus = () => onChangeProductCount(productCount - 1);

  return (
    <Container>
      <CountWrapperProductTitle>{title}</CountWrapperProductTitle>
      <CounterWrapper>
        <ProductCounter
          count={productCount}
          onIncreaseClick={onClickPlus}
          onDecreaseClick={onClickMinus}
          onCountChange={onChangeCountInput}
        ></ProductCounter>
      </CounterWrapper>
      <ProductTotalPrice>
        <PriceNumber>{toKoreanMoneyFormatPure(totalPrice)}</PriceNumber>원
      </ProductTotalPrice>
    </Container>
  );
};

export default observer(CountOption);
