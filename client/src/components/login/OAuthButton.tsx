import React from 'react';
import styled from 'styled-components';
import facebook from './facebook.svg';
import google from './google.svg';
import kakao from './kakao.svg';

const StyledOAuthButton = styled.button<{
  backgroundColor: string;
  fontColor: string;
}>`
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
  font-size: 16px;
  cursor: pointer;

  img {
    max-width: 18px;
    max-height: 18px;
  }
`;

export enum OAuthType {
  Facebook,
  Google,
  Kakao,
}

type ButtonInternal = {
  icon: string;
  backgroundColor: string;
  fontColor: string;
  text: string;
};

const BUTTON_INTERNALS: { [key: string]: ButtonInternal } = {
  [OAuthType.Facebook]: {
    icon: facebook,
    fontColor: '#ffffff',
    backgroundColor: '#4267b2',
    text: '페이스북으로 계속하기',
  },
  [OAuthType.Google]: {
    icon: google,
    fontColor: '#ffffff',
    backgroundColor: '#EA4335',
    text: '구글로 계속하기',
  },
  [OAuthType.Kakao]: {
    icon: kakao,
    fontColor: '#000000',
    backgroundColor: '#ffe812',
    text: '카카오로 계속하기',
  },
};

type PropTypes = {
  type: OAuthType;
};

const OAuthButton = ({ type }: PropTypes): JSX.Element => {
  const { icon, fontColor, backgroundColor, text } = BUTTON_INTERNALS[type];

  return (
    <StyledOAuthButton fontColor={fontColor} backgroundColor={backgroundColor}>
      <img src={icon} />
      <span>{text}</span>
    </StyledOAuthButton>
  );
};

export default OAuthButton;
