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
    borderColor: colors.PRIMARY_DIVIDER,
    borderBottomWidth: 1,
  },
  circleBorder: {
    borderColor: colors.GREY_BORDER_COLOR,
    borderRadius: 32 / 2,
    borderWidth: 1,
    backgroundColor: colors.WHITE,
  },
});

export {flexStyles, borderStyles};
