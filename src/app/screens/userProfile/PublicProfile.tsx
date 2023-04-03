import {ScrollView} from 'react-native';

import CardDetails from '../../components/profile/cardDetails';
import DetailsView from '../../components/profile/cardDetails/detailsView';
import ProfileView from '../../components/profile/cardDetails/profileView';

import colors from '../../constant/colors';

const PublicProfile = () => {
  return (
    <ScrollView style={{backgroundColor: colors.WHITE}}>
      <CardDetails title="profile Details">
        <DetailsView />
      </CardDetails>
      <CardDetails title="Social Media Links">
        <ProfileView />
      </CardDetails>
    </ScrollView>
  );
};

export default PublicProfile;
