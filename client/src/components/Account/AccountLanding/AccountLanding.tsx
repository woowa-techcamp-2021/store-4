import React from 'react';
import styled from 'styled-components';
import User from '../../../models/user';

const Container = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
`;

type Props = {
  user: User;
};
const AccountLanding = (props: Props): JSX.Element => {
  const { user } = props;

  return <Container>환영합니다, {user.name} 님</Container>;
};

export default AccountLanding;
