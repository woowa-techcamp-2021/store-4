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
  font-size: ${(props) => props.theme.fontSize.normal};
  color: inherit;
`;

type Props = {
  backgroundColor: string;
  fontColor: string;
  icon: string;
  content: string;
  onClick: MouseEventHandler;
};

const OAuthButton = (props: Props): JSX.Element => {
  const { icon, fontColor, backgroundColor, content, onClick } = props;

  return (
    <OAuthButtonContainer fontColor={fontColor} backgroundColor={backgroundColor} onClick={onClick}>
      <OAuthIcon src={icon} />
      <OAuthButtonContent>{content}</OAuthButtonContent>
    </OAuthButtonContainer>
  );
};

export default OAuthButton;
