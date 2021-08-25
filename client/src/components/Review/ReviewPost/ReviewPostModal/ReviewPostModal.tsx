import React, { useCallback } from 'react';
import styled from 'styled-components';
import ReviewPostFormContainer from '../../../../containers/ReviewPostFormContainer';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5);
`;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 600px;
  padding: 30px 50px;
  background-color: ${(props) => props.theme.color.white1};
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.color.grey4} 1px 1px 5px;

  z-index: 999;
`;

type Props = {
  onClose: () => void;
};
const ReviewPostModal = (props: Props): JSX.Element => {
  const { onClose } = props;

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.modal')) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <Overlay data-testid="review-post-overlay" onClick={handleOverlayClick}>
      <Modal data-testid="review-post-modal" className="modal">
        <ReviewPostFormContainer onClose={onClose} />
      </Modal>
    </Overlay>
  );
};

export default ReviewPostModal;
