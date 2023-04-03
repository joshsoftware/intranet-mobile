import {ScrollView} from 'react-native';

import CardDetails from '../../components/profile/cardDetails';
import DetailsView from '../../components/profile/cardDetails/detailsView';

import colors from '../../constant/colors';

const PersonalDetails = () => {
  return (
    <ScrollView style={{backgroundColor: colors.WHITE}}>
      <CardDetails title="profile Details">
        <DetailsView />
      </CardDetails>
      <CardDetails title="profile Details">
        <DetailsView />
      </CardDetails>
      <CardDetails title="profile Details">
        <DetailsView />
      </CardDetails>
    </ScrollView>
  );
};

export default PersonalDetails;
