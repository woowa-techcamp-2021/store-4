import React from 'react';
import styled from 'styled-components';
import ManageDeliveryAddressContainer from '../containers/ManageDeliveryAddressContainer';

const Container = styled.div``;

const AccountPage = (): JSX.Element => {
  return (
    <Container>
      <ManageDeliveryAddressContainer />
    </Container>
  );
};

export default AccountPage;
