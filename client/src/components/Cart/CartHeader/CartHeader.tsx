import React from 'react';
import styled, { css } from 'styled-components';
import NEXT from '../../../assets/icons/next.png';
import NEXT_OFF from '../../../assets/icons/next_off.png';

const LAST_STEP = 3;

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

type Props = {
  currentStep: number;
};

const CartHeader = (props: Props): React.ReactElement => {
  const { currentStep } = props;
  const progressList = [
    {
      isSeleted: false,
      step: 1,
      name: '장바구니',
    },
    {
      isSeleted: false,
      step: 2,
      name: '주문서작성/결제',
    },
    {
      isSeleted: false,
      step: 3,
      name: '주문완료',
    },
  ];
  for (const progress of progressList) {
    if (progress.step === currentStep) {
      progress.isSeleted = true;
    }
  }

  return (
    <CartHeaderWrapper>
      <Title>장바구니</Title>
      <ProgressList>
        {progressList.map((item, index) => {
          const { isSeleted, step, name } = item;
          const nextImgSrc = isSeleted ? NEXT : NEXT_OFF;
          return (
            <Progress key={index} isSelected={isSeleted}>
              <Span>{`0${step}`}</Span>
              <Span>{name}</Span>
              {step !== LAST_STEP && <NextImg src={nextImgSrc}></NextImg>}
            </Progress>
          );
        })}
      </ProgressList>
    </CartHeaderWrapper>
  );
};

export default CartHeader;
