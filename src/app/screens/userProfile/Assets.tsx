import React from 'react';

import DetailsCard from '../../components/profile/cardDetails';
import AssetView from '../../components/profile/assets/assetView';
import ErrorMessage from '../../components/errorMessage';
import ScreenWrapper from './components/ScreenWrapper';

import {AssetType} from '../../types';
import {NO_CURRENT_ASSETS, NO_PREVIOUS_ASSETS} from '../../constant/message';

const currentAssetsLabels = ['Name', 'Start Date', 'Is Active'];
const previousAssetsLabels = ['Name', 'Start Date', 'End Date', 'Is Active'];

type Props = {
  data: {
    currentAsset: AssetType[];
    previousAsset: AssetType[];
  };
};

const Asset = ({data}: Props) => {
  return (
    <ScreenWrapper>
      <DetailsCard title="Current Assets">
        {data.currentAsset?.length ? (
          <AssetView labels={currentAssetsLabels} assets={data.currentAsset} />
        ) : (
          <ErrorMessage message={NO_CURRENT_ASSETS} />
        )}
      </DetailsCard>

      <DetailsCard title="Previous Assets">
        {data.previousAsset?.length ? (
          <AssetView
            labels={previousAssetsLabels}
            assets={data.previousAsset}
          />
        ) : (
          <ErrorMessage message={NO_PREVIOUS_ASSETS} />
        )}
      </DetailsCard>
    </ScreenWrapper>
  );
};

export default Asset;
