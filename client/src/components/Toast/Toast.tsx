import React from 'react';
import styled from 'styled-components';
import { slidedown } from '../../styles/animation';

const Container = styled.div`
  z-index: 100;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50px;

  .hide {
    display: none;
  }

  .error {
    color: ${(props) => props.theme.color.white1};
    background-color: ${(props) => props.theme.color.red};
  }

  .success {
    color: ${(props) => props.theme.color.white1};
    background-color: ${(props) => props.theme.color.mint2};
  }

  .info {
    color: ${(props) => props.theme.color.white1};
    background-color: ${(props) => props.theme.color.black};
  }
`;

const ToastWrapper = styled.div`
  transition: all 0.25s;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  padding: 0px 20px;
  height: 40px;
  animation: 0.25s ${slidedown};
`;

const Toast = (): JSX.Element => {
  return (
    <Container>
      <ToastWrapper id="toast-portal" className="hide" />
    </Container>
  );
};

export default Toast;
