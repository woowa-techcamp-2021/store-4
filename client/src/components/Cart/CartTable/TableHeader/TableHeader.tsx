import React from 'react';
import styled from 'styled-components';

const AlignCenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TableHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  border-top: 1px solid ${(props) => props.theme.color.black};
  border-bottom: 1px solid ${(props) => props.theme.color.grey3};
  background-color: ${(props) => props.theme.color.grey1};
`;

const HeaderCheckBox = styled.input`
  width: 38px;
`;
const HeaderTitle = styled(AlignCenterContainer)`
  width: 802px;
`;
const HeaderCount = styled(AlignCenterContainer)`
  width: 120px;
`;
const HeaderPrice = styled(AlignCenterContainer)`
  width: 120px;
`;
const HeaderDeliveryFee = styled(AlignCenterContainer)`
  width: 120px;
`;

const TableHeader = (): JSX.Element => {
  return (
    <TableHeaderWrapper>
      <HeaderCheckBox type="checkbox"></HeaderCheckBox>
      <HeaderTitle>상품/옵션 정보</HeaderTitle>
      <HeaderCount>수량</HeaderCount>
      <HeaderPrice>상품금액</HeaderPrice>
      <HeaderDeliveryFee>배송비</HeaderDeliveryFee>
    </TableHeaderWrapper>
  );
};

export default TableHeader;
