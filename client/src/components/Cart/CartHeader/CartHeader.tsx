import React from 'react';
import styled, { css } from 'styled-components';
import NEXT from '../../../assets/icons/next.png';
import NEXT_OFF from '../../../assets/icons/next_off.png';

const CartHeaderWrapper = styled.div`
  display: flex;
  height: 64.2px;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid rgb(219, 219, 219);
`;

const Title = styled.h2`
  font-family: NotoSans, nanumgothic, 나눔고딕, 'Malgun Gothic', '맑은 고딕', AppleGothic, Dotum,
    돋움, sans-serif;
  font-size: 28px;
  font-weight: 600;
`;

const ProgressList = styled.ol`
  list-style: none;
  display: flex;

  height: 100%;
`;

type ProgressProps = {
  isSelected: boolean;
};
const Progress = styled.li<ProgressProps>`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.theme.color.grey3};

  ${(props) =>
    props.isSelected &&
    css`
      color: ${props.theme.color.black};
    `};
`;
const Span = styled.span`
  padding: 0 1px;
`;

const NextImg = styled.img`
  padding: 0 14px;
`;

const CartHeader = (): React.ReactElement => {
  return (
    <CartHeaderWrapper>
      <Title>장바구니</Title>
      <ProgressList>
        <Progress isSelected={true}>
          <Span>01</Span>
          <Span>장바구니</Span>
          <NextImg src={NEXT}></NextImg>
        </Progress>
        <Progress isSelected={false}>
          <Span>02</Span>
          <Span>주문서작성/결제</Span>
          <NextImg src={NEXT_OFF}></NextImg>
        </Progress>
        <Progress isSelected={false}>
          <Span>03</Span>
          <Span>주문완료</Span>
          <NextImg src={NEXT_OFF}></NextImg>
        </Progress>
      </ProgressList>
    </CartHeaderWrapper>
  );
};

export default CartHeader;
