import React from 'react';
import styled, { keyframes } from 'styled-components';

const modalShowAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5)
  }

  to {
    opacity: 1;
    transform: scale(1)
  }
`;

const modalHideAnimation = keyframes`
  from {
    opacity: 1;
    transform: scale(1)
  }

  to {
    opacity: 0;
    transform: scale(0.5)
  }
`;

const Container = styled.div`
  .hide {
    visibility: hidden;

    .modal {
      animation: ${modalHideAnimation} 0.125s forwards;
    }
  }
`;

const Overlay = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100vh;
  height: 100%;
  position: fixed;
  background-color: ${(props) => props.theme.color.black}60;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 280px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.white1};
  box-shadow: ${(props) => props.theme.color.grey5}08 0px 2px 12px;
  animation: ${modalShowAnimation} 0.125s;
  transition: all 0.125s;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
  padding: 0px 20px;
`;

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
  font-weight: bold;
`;

const Content = styled.div`
  color: ${(props) => props.theme.color.grey5};
`;

const ButtonWrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.color.grey1};
  width: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  flex: 1;
  padding: 20px;
  cursor: pointer;

  :hover {
    background-color: ${(props) => props.theme.color.grey1};
  }

  &:last-child {
    border-bottom-right-radius: 8px;
  }

  &:first-child {
    border-bottom-left-radius: 8px;
  }
`;

const ConfirmModal = (): JSX.Element => {
  const handleCloseClick = () => {
    const modal = document.querySelector('.confirm-modal');
    modal?.classList.add('hide');
  };

  return (
    <Container>
      <Overlay className="confirm-modal hide">
        <Modal className="modal">
          <ContentWrapper>
            <Title className="confirm-modal-title">삭제하시겠습니까?</Title>
            <Content className="confirm-modal-content">배송지가 영구적으로 삭제됩니다</Content>
          </ContentWrapper>
          <ButtonWrapper>
            <Button className="confirm-modal-confirm-button">확인</Button>
            <Button onClick={handleCloseClick}>취소</Button>
          </ButtonWrapper>
        </Modal>
      </Overlay>
    </Container>
  );
};

export default ConfirmModal;
