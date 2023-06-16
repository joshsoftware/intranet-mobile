import colors from '../../constant/colors';

const dateTypes = {
  filled: {
    color: colors.LIGHT_GREEN_BACKGROUND,
    type: 'filled',
  },
  notFilled: {
    color: colors.LIGHT_RED_BACKGROUND,
    type: 'unfilled',
  },
  incompleteFilled: {
    color: colors.YELLOW_BACKGROUND,
    type: 'partiallyFilled',
  },
  leaves: {
    color: colors.LIGHT_BLUE_BACKGROUND,
    type: 'leave',
  },
  holidays: {
    color: colors.GRAY_BACKGROUND,
    type: 'holiday',
  },
};

export const generateMarkedDates = (data: Record<string, string[]>) => {
  let result: Record<string, any> = {};

  Object.entries(dateTypes).forEach(([dateType, value]) => {
    const {color, type} = value;

    data[dateType].forEach((date: string) => {
      result[date] = {
        customStyles: {
          container: {
            backgroundColor: color,
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
        type,
      };
    });
  });

  return result;
};
