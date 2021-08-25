import React from 'react';
import styled, { css } from 'styled-components';
import NEXT from '../../assets/icons/next.png';
import NEXT_OFF from '../../assets/icons/next_off.png';

const LAST_STEP = 3;

const Container = styled.div`
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

const Progress = styled.li`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
`;

type SpanProps = {
  isSelected: boolean;
};
const Span = styled.span<SpanProps>`
  padding: 0 1px;
  color: ${(props) => props.theme.color.grey3};
  ${(props) =>
    props.isSelected &&
    css`
      color: ${props.theme.color.black};
    `};
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
      isSelected: false,
      step: 1,
      name: '장바구니',
    },
    {
      isSelected: false,
      step: 2,
      name: '주문서작성/결제',
    },
    {
      isSelected: false,
      step: 3,
      name: '주문완료',
    },
  ];

  for (const progress of progressList) {
    if (progress.step === currentStep) {
      progress.isSelected = true;
    }
  }

  return (
    <Container>
      <Title>{progressList[currentStep - 1].name}</Title>
      <ProgressList>
        {progressList.map((item, index) => {
          const { isSelected, step, name } = item;
          const nextImgSrc = isSelected ? NEXT : NEXT_OFF;
          return (
            <Progress key={index}>
              <Span isSelected={isSelected}>{`0${step}`}</Span>
              <Span isSelected={isSelected}>{name}</Span>
              {step !== LAST_STEP && <NextImg src={nextImgSrc}></NextImg>}
            </Progress>
          );
        })}
      </ProgressList>
    </Container>
  );
};

export default CartHeader;
