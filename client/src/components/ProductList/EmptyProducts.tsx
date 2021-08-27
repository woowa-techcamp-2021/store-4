import React from 'react';
import styled from 'styled-components';
import { RiDropboxFill } from 'react-icons/ri';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.color.grey3};
  font-size: 80px;
  height: 400px;
  gap: 30px;
`;

const EmptyText = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
`;

const EmptyProducts = (): JSX.Element => {
  return (
    <Container>
      <RiDropboxFill />
      <EmptyText>상품이 없습니다</EmptyText>
    </Container>
  );
};

export default EmptyProducts;
