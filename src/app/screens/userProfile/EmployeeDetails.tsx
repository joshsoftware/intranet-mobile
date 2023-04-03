import {Text, ScrollView} from 'react-native';

import DetailsView from '../../components/views/detailsView';
import DetailsCard from '../../components/cards/detailsCard';

const EmployeeDetails = () => {
  return (
    <ScrollView>
      <DetailsCard title="Employee Details">
        <DetailsView />
      </DetailsCard>
    </ScrollView>
  );
};

export default EmployeeDetails;
