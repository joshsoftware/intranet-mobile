import {StyleSheet} from 'react-native';
import colors from '../app/constant/colors';

const flexStyles = StyleSheet.create({
  horizontal: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  vertical: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const borderStyles = StyleSheet.create({
  thinBorder: {
    borderColor: colors.BORDER,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export {flexStyles, borderStyles};
