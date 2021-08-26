import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import userStore from '../../../stores/userStore';

const Container = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
`;

const AccountLanding = (): JSX.Element => {
  return <Container>환영합니다, {userStore.user?.name} 님</Container>;
};

export default observer(AccountLanding);
