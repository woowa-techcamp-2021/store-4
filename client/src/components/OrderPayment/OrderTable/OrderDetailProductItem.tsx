import React from 'react';
import styled from 'styled-components';
import OrderDetailProduct from '../../../models/orderDetailProduct';
import { toKoreanMoneyFormat } from '../../../utils/moneyFormater';
import { getOptionList } from '../../Cart/helper';

const AlignCenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 82px;
  &:not(:first-child) {
    border-top: 1px solid ${(props) => props.theme.color.grey3};
  }
`;

const ItemTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px;
`;

const ItemImg = styled.img`
  width: 52px;
  height: 52px;
  padding-right: 10px;
`;

const ItemWrapper = styled.div``;

const ItemTitle = styled.div``;

const OptionList = styled.div`
  padding-top: 4px;
`;

const Option = styled.span`
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: 400;
  color: ${(props) => props.theme.color.grey3};

  padding-right: 8px;
`;

const CountWrapper = styled(AlignCenterContainer)`
  flex-direction: column;
  width: 120px;
`;

const Count = styled.div`
  padding-bottom: 7px;
`;

const PriceWrapper = styled(AlignCenterContainer)`
  width: 120px;
`;

const Price = styled(AlignCenterContainer)``;

type Props = {
  orderDetailProduct: OrderDetailProduct;
};

const OrderDetailProductItem = (props: Props): JSX.Element => {
  const { orderDetailProduct } = props;
  const { name, count, thumbnail, selectWithSelecteds } = orderDetailProduct;
  const optionList = getOptionList(selectWithSelecteds);

  return (
    <Container>
      <ItemTitleWrapper>
        <ItemImg src={thumbnail} referrerPolicy="no-referrer" />
        <ItemWrapper>
          <ItemTitle>{name}</ItemTitle>
          <OptionList>
            {optionList.map((option) => (
              <Option key={option.name}>
                {option.type} : {option.name} {`(+${toKoreanMoneyFormat(option.price)})`}
              </Option>
            ))}
          </OptionList>
        </ItemWrapper>
      </ItemTitleWrapper>
      <CountWrapper>
        <Count>{count}개</Count>
      </CountWrapper>
      <PriceWrapper>
        <Price>{toKoreanMoneyFormat(orderDetailProduct.totalPrice)}</Price>
      </PriceWrapper>
    </Container>
  );
};

export default OrderDetailProductItem;
