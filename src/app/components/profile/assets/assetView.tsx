import {View, StyleSheet} from 'react-native';

import AssetItem from './assetItem';
import AssetLabel from './assetLabel';

import {AssetType} from '../../types';
import colors from '../../../constant/colors';

type Props = {
  labels: string[];
  assets: AssetType[];
};
const AssetView = ({labels, assets}: Props) => {
  return (
    <View>
      <AssetLabel
        containerStyle={{marginBottom: 10}}
        textColor={{color: colors.LABEL_COLOR_SECONDARY}}
        labels={labels}
      />
      {assets.map((asset, index) => (
        <AssetItem asset={asset} key={index} count={labels.length} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  assetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20,
    flex: 1,
  },
  labelOfDetails: {
    color: colors.LABEL_COLOR_PRIMARY,
    fontFamily: 'Arial, Regular',
  },
});
export default AssetView;
