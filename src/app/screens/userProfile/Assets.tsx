import {Text, ScrollView} from 'react-native';

import DetailsCard from '../../components/cards/detailsCard';
import AssetView from '../../components/views/assetView';

const assets1 = [
  {
    name: 'iphone',
    startDate: '28/12/2001',
    isActive: true,
  },
  {
    name: 'iphone',
    startDate: '28/12/2001',
    isActive: true,
  },
  {
    name: 'iphone',
    startDate: '28/12/2001',
  },
];

const assets2 = [
  {
    name: 'iphone',
    startDate: '28/12/2001',
    isActive: true,
    endDate: '28/12/2001',
  },
  {
    name: 'iphone',
    startDate: '28/12/2001',
    endDate: '28/12/2001',
    isActive: true,
  },
  {
    name: 'iphone laptop and headphone',
    startDate: '28/12/2001',
    endDate: '28/12/2001',
  },
];

const labels1 = ['Name', 'Start Date', 'is Active'];
const labels2 = ['Name', 'Start Date', 'End Date', 'is Active'];

const Asset = () => {
  return (
    <ScrollView>
      <DetailsCard title="Current Assets">
        <AssetView labels={labels1} assets={assets1} />
      </DetailsCard>

      <DetailsCard title="Previous Assets">
        <AssetView labels={labels2} assets={assets2} />
      </DetailsCard>
    </ScrollView>
  );
};

export default Asset;
