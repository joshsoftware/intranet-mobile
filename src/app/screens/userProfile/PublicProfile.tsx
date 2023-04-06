import React from 'react';
import {ScrollView} from 'react-native';

import CardDetails from '../../components/profile/cardDetails';
import DetailsView from '../../components/profile/cardDetails/detailsView';
import ProfileView from '../../components/profile/cardDetails/profileView';

import {ProfileDetailsType, socialDetailsType} from '../../types';

import colors from '../../constant/colors';

type Props = {
  profileDetails: ProfileDetailsType;
  socialDetails: socialDetailsType;
};

const PublicProfile = ({profileDetails, socialDetails}: Props) => {
  return (
    <ScrollView style={{backgroundColor: colors.WHITE}}>
      <CardDetails title="profile Details">
        <DetailsView data={profileDetails} />
      </CardDetails>
      <CardDetails title="Social Media Links">
        <ProfileView data={socialDetails} />
      </CardDetails>
    </ScrollView>
  );
};

export default PublicProfile;
