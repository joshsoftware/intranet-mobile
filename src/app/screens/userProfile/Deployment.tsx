import React, {useMemo} from 'react';
import {ScrollView} from 'react-native';

import CardDetails from '../../components/profile/cardDetails';
import DetailsView from '../../components/profile/cardDetails/detailsView';

import {deploymentDetailsType} from '../../types';

type Props = {
  data: deploymentDetailsType;
};

const Deployment = ({data}: Props) => {
  return (
    <ScrollView>
      <CardDetails title="Deployment Details">
        <DetailsView data={data} />
      </CardDetails>
    </ScrollView>
  );
};

export default Deployment;
