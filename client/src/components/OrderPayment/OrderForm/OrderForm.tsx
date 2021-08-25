import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import { OrderDeliveryAddressFormRef } from '../../../containers/OrderPaymentContainer';
import { isNotNone } from '../../../utils/typeGuard';

const Container = styled.div`
  border: none;
  padding: 5px 8px;
  outline: none;
  color: ${(props) => props.theme.color.grey5};
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowTitle = styled.div`
  font-size: ${(props) => props.theme.fontSize.normal};
  margin: 16px 0px;
  font-weight: 600;
`;

const Column = styled.div`
  display: flex;
  height: 55px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: 600;
  border-top: 1px solid ${(props) => props.theme.color.grey2};
  :last-child {
    border-bottom: 1px solid ${(props) => props.theme.color.grey2};
  }
`;

const Label = styled.label`
  width: 120px;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 24px;
  background-color: ${(props) => props.theme.color.grey1};
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0px 16px;
`;

type InputProps = {
  width?: string;
};

const Input = styled.input<InputProps>`
  width: ${(props) => props.width || '220px'};
  height: 35px;
  padding: 0px 10px;
  border: 1px solid ${(props) => props.theme.color.grey2};
  text-decoration: none;
  outline: none;
`;

const Username = styled.div``;
const Email = styled.div``;

const RecipientName = styled(Input)``;
const RecipientAddress = styled(Input)``;

const FinalPaymentAmount = styled.div`
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

const FinalCheckWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FinalCheckDesc = styled.div`
  margin: 20px 0px;
`;

const FinalCheck = styled.div`
  margin: 20px 0px;
  display: flex;
  align-items: center;
`;

const Strong = styled.strong``;

const Paragraph = styled.p`
  text-align: center;
  white-space: pre;
  line-height: 1.5;
  margin: 0px 8px;
`;

const PaymentButton = styled.button`
  color: ${(props) => props.theme.color.white1};
  width: 280px;
  height: 60px;
  background-color: ${(props) => props.theme.color.mint2};
  border: none;
  border-radius: 4px;
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.color.mint3};
  }
`;

const OrderForm = (props: any, ref: React.Ref<OrderDeliveryAddressFormRef>): JSX.Element => {
  const recipientNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      get recipientName(): string {
        return recipientNameRef.current?.value ?? '';
      },
      get address(): string {
        return addressRef.current?.value ?? '';
      },
      set recipientName(value: string) {
        if (isNotNone(recipientNameRef.current)) {
          recipientNameRef.current.value = value;
        }
      },
      set address(value: string) {
        if (isNotNone(addressRef.current)) {
          addressRef.current.value = value;
        }
      },
    }),
    []
  );

  return (
    <Container>
      <Row>
        <RowTitle>주문자 정보</RowTitle>
        <Column>
          <Label>주문하시는 분</Label>
          <InputWrapper>
            <Username>주문자</Username>
          </InputWrapper>
        </Column>
        <Column>
          <Label>이메일</Label>
          <InputWrapper>
            <Email>이메일</Email>
          </InputWrapper>
        </Column>
      </Row>

      <Row>
        <RowTitle>배송정보</RowTitle>
        <Column>
          <Label>받으실 분</Label>
          <InputWrapper>
            <RecipientName ref={recipientNameRef} defaultValue={''} placeholder="받으실분" />
          </InputWrapper>
        </Column>
        <Column>
          <Label>받으실 곳</Label>
          <InputWrapper>
            <RecipientAddress
              width={'440px'}
              ref={addressRef}
              defaultValue={''}
              placeholder="받으실 곳"
            />
          </InputWrapper>
        </Column>
      </Row>

      <Row>
        <FinalPaymentAmount>
          <AmountDesc>최종 결제 금액</AmountDesc>
          <Amount>37,900원</Amount>
        </FinalPaymentAmount>
      </Row>

      <FinalCheckWrapper>
        <FinalCheckDesc>
          <Paragraph>
            {`전자상거래 등에서의 소비자보호에 관한 법률에 의거하여 미성년자가 물품을 구매하는 경우,\n법정대리인이 동의하지 않으면 미성년자 본인 또는 법정대리인이 구매를 취소할 수 있습니다.`}
          </Paragraph>
        </FinalCheckDesc>
        <FinalCheck>
          <input type="checkbox" />
          <Paragraph>
            <Strong>(필수)</Strong> 구매하실 상품의 결제정보를 확인하였으며, 구매진행에 동의합니다.
          </Paragraph>
        </FinalCheck>
        <FinalCheck>
          <PaymentButton>결제하기</PaymentButton>
        </FinalCheck>
      </FinalCheckWrapper>
    </Container>
  );
};

export default forwardRef(OrderForm);
