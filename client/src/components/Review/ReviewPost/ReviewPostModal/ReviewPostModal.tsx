import React, { useCallback } from 'react';
import styled from 'styled-components';

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
  width: 600px;
  height: 600px;
  background-color: ${(props) => props.theme.color.white1};
  border: 1px solid ${(props) => props.theme.color.white2};

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
    <Overlay onClick={handleOverlayClick}>
      <Modal className="modal">
        <h1>글쓰기</h1>
        <input type="text" />
        <input type="file" />
        <button onClick={onClose}>닫기</button>
      </Modal>
    </Overlay>
  );
};

export default ReviewPostModal;
