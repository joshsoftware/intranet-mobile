import React from 'react';

import CardDetails from '../../components/profile/cardDetails';
import DetailsView from '../../components/profile/cardDetails/detailsView';
import ScreenWrapper from './components/ScreenWrapper';

import {deploymentDetailsType} from '../../types';

type Props = {
  data: deploymentDetailsType;
};

const Deployment = ({data}: Props) => {
  return (
    <ScreenWrapper>
      <CardDetails title="Deployment Details">
        <DetailsView data={data} />
      </CardDetails>
    </ScreenWrapper>
  );
};

export default Deployment;
