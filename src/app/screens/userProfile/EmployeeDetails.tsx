import {ScrollView} from 'react-native';

import DetailsView from '../../components/profile/cardDetails/detailsView';
import CardDetails from '../../components/profile/cardDetails';

const EmployeeDetails = () => {
  return (
    <ScrollView>
      <CardDetails title="Employee Details">
        <DetailsView />
      </CardDetails>
    </ScrollView>
  );
};

export default EmployeeDetails;
