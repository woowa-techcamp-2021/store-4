import React from 'react';
import Logout from '../components/Logout/Logout';
import userStore from '../stores/userStore';

const LogoutContainer = (): JSX.Element => {
  const handleLogout = () => {
    userStore.logoutUser();
    history.back();
  };

  return <Logout onLogout={handleLogout} />;
};

export default LogoutContainer;
