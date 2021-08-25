import React from 'react';
import styled from 'styled-components';

import TableHeader from './TableHeader';
import OrderItem from './OrderItem';
import { observer } from 'mobx-react';

const Container = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: 700;
  margin-top: 60px;
`;

const TableMain = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.color.grey3};
`;

const CartItemList = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

type Props = {
  onOptionClick: (id: number) => void;
};

const OrderTable = (props: Props): JSX.Element => {
  const { onOptionClick } = props;

  return (
    <Container>
      <TableHeader />
      <TableMain>
        <CartItemList>
          <OrderItem
            key={1}
            id={1}
            title={'하하하'}
            imgSrc={''}
            count={3}
            productPrice={20000}
            isSelected={true}
            selectWithSelecteds={undefined}
            onOptionClick={() => {
              return;
            }}
          />
        </CartItemList>
      </TableMain>
    </Container>
  );
};

export default observer(OrderTable);
