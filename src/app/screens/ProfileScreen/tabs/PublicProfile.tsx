import React from 'react';

import ScreenWrapper from '../component/ScreenWrapper';
import Card from '../component/Card';
import DetailRow from '../../../components/DetailRow';

import {dateFormate} from '../../../utils/date';

import {IPublicProfileData} from '../interface/publicProfile';

const PublicProfile = ({publicProfile}: IPublicProfileData) => {
  const {firstName, lastName, gender, mobileNumber, bloodGroup, dateOfBirth} =
    publicProfile || {};

  return (
    <ScreenWrapper>
      <Card title="Profile Details">
        <DetailRow label="First Name" value={firstName} />
        <DetailRow label="Last Name" value={lastName} />
        <DetailRow label="Gender" value={gender} />
        <DetailRow label="Mobile Number" value={mobileNumber} />
        <DetailRow label="Blood Group" value={bloodGroup} />
        <DetailRow label="Date of Birth" value={dateFormate(dateOfBirth)} />
      </Card>
    </ScreenWrapper>
  );
};

export default React.memo(PublicProfile);
