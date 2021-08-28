import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Order from '../../../models/order';
import AccountOrderTableHeader from './AccountOrderTable/AccountOrderTableHeader';
import AccountOrderTableItem from './AccountOrderTable/AccountOrderTableItem';
import getPaginatedArray from '../../../utils/getPaginatedArray';
import ReviewPagination from '../../Review/ReviewPagination/ReviewPagination';

const ORDER_EMPTY_TEXT = '결제한 내역이 없습니다';
const ORDER_PER_PAGE = 5;

const Container = styled.div`
  flex: 1;
`;

const OrderTitle = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
  font-weight: 600;
  margin-bottom: 20px;
`;

const OrderEmpty = styled.div`
  margin-top: 32px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.color.grey4};
`;

const AccountOrderTable = styled.div`
  width: 100%;
`;

const OrderPagination = styled(ReviewPagination)``;

type Props = {
  orders: Order[];
};

const AccountOrder = (props: Props): JSX.Element => {
  const { orders } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(orders.length / ORDER_PER_PAGE);
  const showPagination = totalPages > 1;
  const displayedOrders = getPaginatedArray(orders, ORDER_PER_PAGE, currentPage);

  const handlePageNumClick = useCallback((pageNum: number) => setCurrentPage(pageNum), []);

  const handlePageNavButtonClick = useCallback(
    (type: 'prev' | 'next') =>
      setCurrentPage((prevCurrentPage) =>
        type === 'prev' ? prevCurrentPage - 1 : prevCurrentPage + 1
      ),
    []
  );

  const AccountOrderItems = displayedOrders.map((order) => (
    <AccountOrderTableItem key={order.id} order={order} />
  ));

  return (
    <Container>
      <OrderTitle>주문 관리</OrderTitle>
      {orders.length === 0 ? (
        <OrderEmpty>{ORDER_EMPTY_TEXT}</OrderEmpty>
      ) : (
        <>
          <AccountOrderTable>
            <AccountOrderTableHeader />
            {AccountOrderItems}
          </AccountOrderTable>
          {showPagination && (
            <OrderPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageNumClick={handlePageNumClick}
              onPageNavButtonClick={handlePageNavButtonClick}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default AccountOrder;
