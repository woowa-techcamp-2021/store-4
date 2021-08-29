import React from 'react';
import styled from 'styled-components';
import { Link } from '../../../lib/router';
import { RiStoreFill } from 'react-icons/ri';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180px;
`;

const EmptyMessage = styled.div`
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSize.large};

  display: flex;
  align-items: center;
`;

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 10px 9px 10px;
  margin-top: 20px;

  border: 3px solid ${(props) => props.theme.color.black};

  :hover {
    color: ${(props) => props.theme.color.mint3};
    border-color: ${(props) => props.theme.color.mint3};
  }
`;

const Text = styled.span`
  margin-right: 3px;
  font-size: ${(props) => props.theme.fontSize.medium};
`;

const IconWrapper = styled.div`
  font-size: ${(props) => props.theme.fontSize.large};
  position: relative;
  top: 2px;
`;

const EmptyMessageBox = (): JSX.Element => {
  return (
    <Container>
      <EmptyMessage>찜한 상품이 없습니다!</EmptyMessage>
      <Link to="/">
        <MessageWrapper>
          <Text>문방구로 가기</Text>
          <IconWrapper>
            <RiStoreFill />
          </IconWrapper>
        </MessageWrapper>
      </Link>
    </Container>
  );
};

export default EmptyMessageBox;
