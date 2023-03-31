import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import colors from '../../constant/colors';
import {AssetType} from '../types';
import Typography from '../typography';

type Props = {
  asset: AssetType;
  count: number;
  key: number;
};
const AssetItem = ({asset, count}: Props) => {
  return (
    <View style={styles.assetContainer}>
      <Typography
        style={{
          color: colors.TERNARY_TEXT_COLOR,
          flexBasis: '25%',
        }}
        type="header">
        {asset.name ? asset.name : '-'}
      </Typography>

      <Typography
        style={{
          color: colors.TERNARY_TEXT_COLOR,
          flexBasis: `${60 / (count - 2)}%`,
          textAlign: 'center',
        }}
        type="header">
        {asset.startDate ? asset.startDate : '-'}
      </Typography>
      {asset.endDate != undefined && (
        <Typography
          style={{
            color: colors.TERNARY_TEXT_COLOR,
            flexBasis: `${60 / (count - 2)}%`,
            textAlign: 'center',
          }}
          type="header">
          {asset.startDate ? asset.startDate : '-'}
        </Typography>
      )}
      <Typography
        style={{
          color: colors.TERNARY_TEXT_COLOR,
          flexBasis: '15%',
          textAlign: 'center',
        }}>
        {asset.isActive ? 'Yes' : asset.isActive == false ? 'No' : '-'}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  assetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default AssetItem;
