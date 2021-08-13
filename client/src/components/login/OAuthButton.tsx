import React from 'react';
import styled from 'styled-components';
import facebook from './facebook.png';
import google from './google.png';
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
  gap: 20px;
  height: 60px;
  width: 350px;
  padding: 15px;
  border: none;
  font-size: 16px;
  cursor: pointer;

  img {
    height: 100%;
    max-width: 60px;
  }
`;

type OAuthType = 'facebook' | 'google' | 'kakao';

type ButtonInternal = {
  icon: string;
  backgroundColor: string;
  fontColor: string;
  text: string;
};

type PropTypes = {
  type: OAuthType;
};

const BUTTON_INTERNALS: { [key: string]: ButtonInternal } = {
  facebook: {
    icon: facebook,
    fontColor: '#ffffff',
    backgroundColor: '#4267b2',
    text: '페이스북으로 로그인',
  },
  google: {
    icon: google,
    fontColor: '#ffffff',
    backgroundColor: '#EA4335',
    text: '구글로 로그인',
  },
  kakao: {
    icon: kakao,
    fontColor: '#000000',
    backgroundColor: '#ffe812',
    text: '카카오로 로그인',
  },
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
