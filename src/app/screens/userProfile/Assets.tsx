import React from 'react';
import {ScrollView} from 'react-native';

import DetailsCard from '../../components/profile/cardDetails';
import AssetView from '../../components/profile/assets/assetView';

import {AssetType} from '../../types';

const labels1 = ['Name', 'Start Date', 'is active'];
const labels2 = ['Name', 'Start Date', 'End Date', 'is active'];

type Props = {
  data: {
    currentAssets: AssetType[];
    previousAssets: AssetType[];
  };
};

const Asset = ({data}: Props) => {
  return (
    <ScrollView>
      <DetailsCard title="Current Assets">
        <AssetView labels={labels1} assets={data.currentAssets} />
      </DetailsCard>

      <DetailsCard title="Previous Assets">
        <AssetView labels={labels2} assets={data.previousAssets} />
      </DetailsCard>
    </ScrollView>
  );
};

export default Asset;
