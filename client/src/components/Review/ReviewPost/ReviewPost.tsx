import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import ReviewPostModal from './ReviewPostModal/ReviewPostModal';

const BUTTON_TEXT = '상품후기 글쓰기';

const PostReviewButton = styled.button`
  border: none;
  border-radius: 2px;
  background-color: ${(props) => props.theme.color.black};
  font-size: ${(props) => props.theme.fontSize.tiny};
  color: ${(props) => props.theme.color.white1};
  margin-bottom: 4px;
  padding: 12px 16px;
  font-weight: 500;
  cursor: pointer;

  :hover {
    opacity: 0.9;
  }
`;

type Props = {
  getAuthorization: () => boolean;
};

const ReviewPost = (props: Props): JSX.Element => {
  const { getAuthorization } = props;
  const [modalOpen, setModalOpen] = useState(false);

  const handleWriteButtonClick = useCallback(() => {
    const isAuthorized = getAuthorization();
    if (isAuthorized) {
      setModalOpen(true);
    }
  }, [getAuthorization]);

  const handleModalClose = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <PostReviewButton onClick={handleWriteButtonClick}>{BUTTON_TEXT}</PostReviewButton>
      {modalOpen && <ReviewPostModal onClose={handleModalClose} />}
    </>
  );
};

export default ReviewPost;
