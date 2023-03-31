import {ScrollView, Text, View} from 'react-native';
import DetailsCard from '../components/cards/detailsCard';

const PersonalDetails = () => {
  return (
    <ScrollView>
      <DetailsCard title="profile Details" />
      <DetailsCard title="profile Details" />
      <DetailsCard title="profile Details" />
      <DetailsCard title="profile Details" />
    </ScrollView>
  );
};

export default PersonalDetails;
