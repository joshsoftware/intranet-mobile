import React from 'react';
import {ScrollView} from 'react-native';

import DetailsCard from '../../components/profile/cardDetails';
import AssetView from '../../components/profile/assets/assetView';

import {AssetType} from '../../types';

const currentAssetsLabels = ['Name', 'Start Date', 'Is Active'];
const previousAssetsLabels = ['Name', 'Start Date', 'End Date', 'Is Active'];

type Props = {
  data: {
    currentAssets: AssetType[];
    previousAssets: AssetType[];
  };
};

const Asset = ({data}: Props) => {
  return (
    <ScrollView>
      <DetailsCard title="Current Assets" key={0}>
        <AssetView labels={currentAssetsLabels} assets={data.currentAssets} />
      </DetailsCard>

      <DetailsCard title="Previous Assets" key={1}>
        <AssetView labels={previousAssetsLabels} assets={data.previousAssets} />
      </DetailsCard>
    </ScrollView>
  );
};

export default Asset;
