import React from 'react';

import CardDetails from '../../components/profile/cardDetails';
import DetailsView from '../../components/profile/cardDetails/detailsView';
import ProfileView from '../../components/profile/cardDetails/profileView';
import ScreenWrapper from './components/ScreenWrapper';

import labelFormatter from '../../utils/userProfile/labelFormatter';

import {profileDetailsType, detailsType, socialDetailsType} from '../../types';

type Props = {
  data: {publicProfile: profileDetailsType; socialDetails: socialDetailsType};
};

const PublicProfile = ({data}: Props) => {
  const dataArray = Object.entries(data);
  return (
    <ScreenWrapper>
      {dataArray.map(([key, content], index: number) =>
        key === 'socialDetails' ? (
          <CardDetails key={index} title={labelFormatter(key)}>
            <ProfileView data={content as socialDetailsType} />
          </CardDetails>
        ) : (
          <CardDetails key={index} title={labelFormatter(key)}>
            <DetailsView data={content as detailsType} />
          </CardDetails>
        ),
      )}
    </ScreenWrapper>
  );
};

export default PublicProfile;
