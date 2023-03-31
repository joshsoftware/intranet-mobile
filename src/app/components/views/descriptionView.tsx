import {StyleSheet, Text, View} from 'react-native';
import Typography from '../typography';

const DescriptionView = ({data}: {data?: string}) => {
  return (
    <View>
      <Typography type="header">{data}</Typography>
    </View>
  );
};

export default DescriptionView;
