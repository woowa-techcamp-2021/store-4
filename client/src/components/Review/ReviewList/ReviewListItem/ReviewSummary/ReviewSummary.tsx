import React, { ForwardedRef, forwardRef, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { RiArrowDownSLine } from 'react-icons/ri';

type ContainerProps = {
  isClickable: boolean;
};
const Container = styled.div<ContainerProps>`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'default')};
`;

type ReviewTitleProps = {
  maxWidth: number;
};
const ReviewTitle = styled.span<ReviewTitleProps>`
  font-size: ${(props) => props.theme.fontSize.small};
  max-width: ${(props) => props.maxWidth}px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

type SeeMoreProps = {
  isCloseIcon: boolean;
};

const SeeMore = styled.div<SeeMoreProps>`
  margin-right: 16px;
  cursor: pointer;
  transform: rotate(${(props) => (props.isCloseIcon ? '-180' : '0')}deg);
  transition: transform 0.3s ease-in-out;
`;

type Props = {
  content: string;
  maxTitleWidth: number;
  onClick: MouseEventHandler;
  isClickable: boolean;
  reviewDetailOpen: boolean;
};
const ReviewSummary = (props: Props, ref: ForwardedRef<HTMLSpanElement>): JSX.Element => {
  const { onClick, isClickable, content, maxTitleWidth, reviewDetailOpen } = props;
  return (
    <Container onClick={onClick} isClickable={isClickable}>
      <ReviewTitle maxWidth={maxTitleWidth} ref={ref}>
        {content}
      </ReviewTitle>
      {isClickable && (
        <SeeMore isCloseIcon={reviewDetailOpen}>
          <RiArrowDownSLine />
        </SeeMore>
      )}
    </Container>
  );
};

export default forwardRef(ReviewSummary);
