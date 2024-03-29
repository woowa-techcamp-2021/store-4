import React from 'react';
import styled from 'styled-components';
import ReviewPostContainer from '../../../containers/ReviewPostContainer';

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.color.grey3};
`;

const ReviewTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.large};
  font-weight: 500;
`;

type ReviewTitleBadgeProps = {
  hasNoReview: boolean;
};
const ReviewTitleBadge = styled.span<ReviewTitleBadgeProps>`
  font-size: ${(props) => props.theme.fontSize.normal};
  color: ${(props) => (props.hasNoReview ? props.theme.color.mint1 : props.theme.color.mint2)};
  padding: 0 10px;
`;

type Props = {
  title: string;
  reviewCount: number;
};
const ReviewHeader = (props: Props): JSX.Element => {
  const { title, reviewCount } = props;

  return (
    <Container>
      <ReviewTitle>
        {title}
        <ReviewTitleBadge hasNoReview={reviewCount === 0} data-testid="review-badge">
          {reviewCount}
        </ReviewTitleBadge>
      </ReviewTitle>
      <ReviewPostContainer />
    </Container>
  );
};

export default ReviewHeader;
