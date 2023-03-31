import {StyleSheet, View} from 'react-native';
import colors from '../../constant/colors';

const CircleView = () => {
  return <View style={styles.circle}></View>;
};

const styles = StyleSheet.create({
  circle: {
    width: 32,
    height: 32,
    borderColor: colors.GREY_BORDER_COLOR,
    borderRadius: 32 / 2,
    borderWidth: 1,
    backgroundColor: colors.WHITE,
  },
});

export default CircleView;
