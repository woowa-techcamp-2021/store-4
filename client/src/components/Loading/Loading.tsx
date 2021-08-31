import React from 'react';
import styled, { keyframes } from 'styled-components';
import { RiLoader4Line } from 'react-icons/ri';

const spin = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const Spinner = styled(RiLoader4Line)`
  position: absolute;
  top: 40%;
  left: 50%;
  transform-origin: center;
  animation: ${spin} 1s infinite;
  color: ${(props) => props.theme.color.grey5};
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: ${(props) => props.theme.fontSize.xLarge};
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 99;
`;

const Loading = (): JSX.Element => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default Loading;
