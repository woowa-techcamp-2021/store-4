import React from 'react';
import styled from 'styled-components';
import { Link } from '../lib/router';

const Container = styled.div`
  width: ${(props) => props.theme.device.desktop};
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  margin: 60px 0px;
`;

const Body = styled.div``;

const Paragraph = styled.p`
  margin: 24px 0px;
`;

const ToMainText = styled.span`
  color: ${(props) => props.theme.color.grey5};
  :hover {
    color: ${(props) => props.theme.color.black};
  }
`;

const ErrorPage = (): JSX.Element => {
  return (
    <Container>
      <Title>뭔가 잘못된 것으로 보이는 군요!</Title>
      <Body>
        <Paragraph>일시적인 오류일 수 있으니, 다시 시도 해주세요.</Paragraph>
        <Paragraph>만약 반복된다면, 저희에게 연락 주시면 감사하겠습니다 :)</Paragraph>
        <Paragraph>
          <Link to="/">
            <ToMainText>메인으로 돌아가기</ToMainText>
          </Link>
        </Paragraph>
      </Body>
    </Container>
  );
};

export default ErrorPage;
