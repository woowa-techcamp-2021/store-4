import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: ${(props) => props.theme.fontSize.xLarge};
`;

const Loading = (): JSX.Element => {
  return <Container>잠시만 기다려주세요</Container>;
};

export default Loading;
