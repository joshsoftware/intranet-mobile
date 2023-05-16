import React from 'react';

import CustomTabView from './customTabView';
import Header from '../../components/header';

const UserProfile = () => {
  return (
    <>
      <Header type="secondary" title="Profile" isRightButtonVisible={false} />
      <CustomTabView />
    </>
  );
};

export default UserProfile;
