import React from 'react';
import styled, { keyframes } from 'styled-components';

const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  height: 100%;
  position: fixed;
  background-color: ${(props) => props.theme.color.black}60;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const modalAnimation = keyframes`
  from {
    transform: scale(0.5)
  }

  to {
    transform: scale(1)
  }
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 280px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.white1};
  box-shadow: ${(props) => props.theme.color.grey5}05 0px 2px 12px;
  animation: ${modalAnimation} 0.25s;
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
  font-weight: bold;

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
  return (
    <Overlay>
      <Modal>
        <ContentWrapper>
          <Title>삭제하시겠습니까?</Title>
          <Content>배송지가 영구적으로 삭제됩니다</Content>
        </ContentWrapper>
        <ButtonWrapper>
          <Button>확인</Button>
          <Button>취소</Button>
        </ButtonWrapper>
      </Modal>
    </Overlay>
  );
};

export default ConfirmModal;
