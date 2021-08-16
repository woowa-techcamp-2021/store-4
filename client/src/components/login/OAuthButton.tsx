import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

type ContainerProps = {
  backgroundColor: string;
  fontColor: string;
};

const OAuthButtonContainer = styled.button<ContainerProps>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.fontColor};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  height: 50px;
  width: 300px;
  padding: 15px;
  border: none;
  cursor: pointer;
`;

const OAuthIcon = styled.img`
  max-width: 18px;
  max-height: 100%;
`;

const OAuthButtonContent = styled.span`
  font-size: 16px;
`;

type Props = {
  backgroundColor: string;
  fontColor: string;
  icon: string;
  content: string;
  onClick: MouseEventHandler;
};

const OAuthButton = ({
  icon,
  fontColor,
  backgroundColor,
  content,
  onClick,
}: Props): JSX.Element => {
  return (
    <OAuthButtonContainer fontColor={fontColor} backgroundColor={backgroundColor} onClick={onClick}>
      <OAuthIcon src={icon} />
      <OAuthButtonContent>{content}</OAuthButtonContent>
    </OAuthButtonContainer>
  );
};

export default OAuthButton;
