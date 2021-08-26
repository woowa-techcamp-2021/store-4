import React from 'react';
import styled from 'styled-components';
import { toKoreanMoneyFormat } from '../../../utils/moneyFormater';
import { Row } from './OrderFormStyledComponent';

const FinalPaymentAmountWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 30px 40px;
  margin: 40px 0px;
  border: 2px solid ${(props) => props.theme.color.grey2};
`;

const AmountDesc = styled.span`
  font-weight: 600;
  font-size: ${(props) => props.theme.fontSize.small};
`;
const Amount = styled.div`
  font-weight: 600;
  font-family: ${(props) => props.theme.fontFamily.number};
  font-size: ${(props) => props.theme.fontSize.large};
  margin-left: 16px;
`;

type Props = {
  finalPaymentAmount: number;
};

const FinalPaymentAmount = (props: Props): JSX.Element => {
  const { finalPaymentAmount } = props;
  return (
    <Row>
      <FinalPaymentAmountWrapper>
        <AmountDesc>최종 결제 금액</AmountDesc>
        <Amount>{toKoreanMoneyFormat(finalPaymentAmount)}</Amount>
      </FinalPaymentAmountWrapper>
    </Row>
  );
};

export default FinalPaymentAmount;
