import React, {useMemo} from 'react';
import {ScrollView} from 'react-native';

import CardDetails from '../../components/profile/cardDetails';
import DetailsView from '../../components/profile/cardDetails/detailsView';
import ProfileView from '../../components/profile/cardDetails/profileView';

import labelFormatter from '../../utils/userProfile/labelFormatter';

import {profileDetailsType, detailsType, socialDetailsType} from '../../types';
import colors from '../../constant/colors';

type Props = {
  data: {profileDetails: profileDetailsType; socialDetails: socialDetailsType};
};

const PublicProfile = ({data}: Props) => {
  const dataArray = Object.entries(data);
  return (
    <ScrollView style={{backgroundColor: colors.WHITE}}>
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
    </ScrollView>
  );
};

export default PublicProfile;
