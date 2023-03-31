import {Text, View, StyleSheet, ScrollView} from 'react-native';
import AssetItem from '../atoms/assetItem';
import Label from '../atoms/label';
import {AssetType} from '../types';

type Props = {
  labels: string[];
  assets: AssetType[];
};
const AssetView = ({labels, assets}: Props) => {
  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{flexDirection: 'column', flex: 1}}>
      <Label
        containerStyle={{marginBottom: 10}}
        textColor={{color: '#333333'}}
        labels={labels}
      />
      {assets.map((asset, index) => (
        <AssetItem asset={asset} key={index} count={labels.length} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  assetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  labelOfDetails: {
    color: '#A3A3A3',
    fontFamily: 'Arial, Regular',
  },
});
export default AssetView;
