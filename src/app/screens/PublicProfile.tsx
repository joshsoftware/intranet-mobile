import {ScrollView, Text, View} from 'react-native';
import DetailsCard from '../components/cards/detailsCard';

const PublicProfile = () => {
  return (
    <View>
      <DetailsCard title="profile Details" />
      <DetailsCard title="Social Media Links" />
    </View>
  );
};

export default PublicProfile;
