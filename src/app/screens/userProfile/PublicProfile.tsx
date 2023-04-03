import {ScrollView, Text, View} from 'react-native';

import DetailsCard from '../../components/cards/detailsCard';
import DetailsView from '../../components/views/detailsView';
import ProfileView from '../../components/views/profileView';

import colors from '../../constant/colors';

const PublicProfile = () => {
  return (
    <ScrollView style={{backgroundColor: colors.WHITE}}>
      <DetailsCard title="profile Details">
        <DetailsView />
      </DetailsCard>
      <DetailsCard title="Social Media Links">
        <ProfileView />
      </DetailsCard>
    </ScrollView>
  );
};

export default PublicProfile;
