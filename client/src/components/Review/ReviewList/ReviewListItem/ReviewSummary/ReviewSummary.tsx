import React, { MouseEventHandler, RefObject } from 'react';
import styled from 'styled-components';
import { MAX_TITLE_WIDTH } from '../ReviewListItem';
import CHEVRON_DOWN from './chevronDown.png';

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

const ReviewTitle = styled.span`
  font-size: ${(props) => props.theme.fontSize.small};
  max-width: ${MAX_TITLE_WIDTH}px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

type SeeMoreProps = {
  isCloseIcon: boolean;
};
const SeeMore = styled.button<SeeMoreProps>`
  width: 10px;
  height: 10px;
  margin-right: 16px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  background-image: url(${CHEVRON_DOWN});
  background-size: contain;
  transform: rotate(${(props) => (props.isCloseIcon ? '-180' : '0')}deg);
  transition: transform 0.3s ease-in-out;
`;

type Props = {
  content: string;
  onClick: MouseEventHandler;
  isClickable: boolean;
  reviewTitleRef: RefObject<HTMLSpanElement>;
  reviewDetailOpen: boolean;
};
const ReviewSummary = (props: Props): JSX.Element => {
  const { onClick, isClickable, content, reviewTitleRef, reviewDetailOpen } = props;
  return (
    <Container onClick={onClick} isClickable={isClickable}>
      <ReviewTitle ref={reviewTitleRef}>{content}</ReviewTitle>
      {isClickable && <SeeMore isCloseIcon={reviewDetailOpen} />}
    </Container>
  );
};

export default ReviewSummary;
