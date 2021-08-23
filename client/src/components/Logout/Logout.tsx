import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

type Props = {
  onLogout: () => void;
};

const Logout = (props: Props): JSX.Element => {
  const { onLogout } = props;
  useEffect(() => onLogout(), [onLogout]);

  return <Container />;
};

export default Logout;
