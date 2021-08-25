import React, { MouseEventHandler } from 'react';
import styled, { keyframes } from 'styled-components';

type ContainerProps = {
  index: number;
};

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.button<ContainerProps>`
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  height: 40px;
  width: 300px;
  padding: 15px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.color.mint2};
  border-radius: 3px;
  animation: ${slideUp} 0.5s forwards;
  animation-delay: ${(props) => props.index * 0.25}s;

  :hover {
    background-color: ${(props) => props.theme.color.mint3};
  }
`;

const OAuthButtonContent = styled.span`
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.color.white1};
`;

type Props = {
  content: string;
  onClick: MouseEventHandler;
  index: number;
};

const OAuthButton = (props: Props): JSX.Element => {
  const { content, onClick, index } = props;

  return (
    <Container onClick={onClick} index={index}>
      <OAuthButtonContent>{content}</OAuthButtonContent>
    </Container>
  );
};

export default OAuthButton;
