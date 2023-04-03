import {ScrollView, Text, View} from 'react-native';

import DetailsCard from '../../components/cards/detailsCard';
import DetailsView from '../../components/views/detailsView';

import colors from '../../constant/colors';

const PersonalDetails = () => {
  return (
    <ScrollView style={{backgroundColor: colors.WHITE}}>
      <DetailsCard title="profile Details">
        <DetailsView />
      </DetailsCard>
      <DetailsCard title="profile Details">
        <DetailsView />
      </DetailsCard>
      <DetailsCard title="profile Details">
        <DetailsView />
      </DetailsCard>
    </ScrollView>
  );
};

export default PersonalDetails;
