import React from 'react';
import styled from 'styled-components';
import { Mock } from '../../../../containers/ReviewContainer';
import formatDate from '../../../../utils/formatDate';
import formatText from '../../../../utils/formatText';
import { generateStars } from './Star';

const MAX_CONTENT_LENGTH = 80;

const Container = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid ${(props) => props.theme.color.grey2};

  :first-child {
    padding-top: 0;
  }
`;

const ReviewStars = styled.span`
  flex-shrink: 0;
  width: 80px;
  margin-right: 40px;
  display: flex;
`;

const ReviewTitle = styled.span`
  flex: 1;
  font-size: ${(props) => props.theme.fontSize.small};
`;

const ReviewDate = styled.span`
  font-size: ${(props) => props.theme.fontSize.tiny};
  text-align: left;
`;

type Props = {
  review: Mock;
};

const ReviewListItem = (props: Props): JSX.Element => {
  const { review } = props;
  const stars = generateStars(review.point);

  return (
    <Container>
      <ReviewStars>{stars}</ReviewStars>
      <ReviewTitle>{formatText(review.content, MAX_CONTENT_LENGTH)}</ReviewTitle>
      <ReviewDate>{formatDate(review.updatedAt)}</ReviewDate>
    </Container>
  );
};

export default ReviewListItem;
