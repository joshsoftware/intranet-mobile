import colors from '../../constants/colors';
import {
  BronzeIcon,
  GoldIcon,
  PlatinumIcon,
  SilverIcon,
} from '../../constants/icons';

const userBadgeProperty = {
  platinum: {
    border: {borderColor: colors.PLATINUM},
    backgroundColor: {backgroundColor: colors.PLATINUM},
    icon: PlatinumIcon,
  },
  gold: {
    border: {borderColor: colors.GOLD},
    backgroundColor: {backgroundColor: colors.GOLD},
    icon: GoldIcon,
  },
  silver: {
    border: {borderColor: colors.SILVER},
    backgroundColor: {backgroundColor: colors.SILVER},
    icon: SilverIcon,
  },
  bronze: {
    border: {borderColor: colors.BRONZE},
    backgroundColor: {backgroundColor: colors.BRONZE},
    icon: BronzeIcon,
  },
  basicUser: {
    border: {borderColor: colors.PRIMARY},
    backgroundColor: {backgroundColor: colors.PRIMARY},
    icon: '',
  },
};

export default userBadgeProperty;
