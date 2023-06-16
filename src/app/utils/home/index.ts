import colors from '../../constant/colors';

const dateTypes: Record<string, string> = {
  filled: colors.LIGHT_GREEN_BACKGROUND,
  notFilled: colors.LIGHT_RED_BACKGROUND,
  incompleteFilled: colors.YELLOW_BACKGROUND,
  leaves: colors.LIGHT_BLUE_BACKGROUND,
  holidays: colors.GRAY_BACKGROUND,
};

export const generateMarkedDates = (data: Record<string, string[]>) => {
  let result: Record<string, any> = {};

  ['holidays', 'leaves'].forEach(dateType => {
    const color = dateTypes[dateType];

    data[dateType].forEach((date: string) => {
      result[date] = {
        customStyles: {
          container: {
            backgroundColor: color,
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
        type: dateType,
      };
    });
  });

  ['filled', 'notFilled', 'incompleteFilled'].forEach(dateType => {
    const color = dateTypes[dateType];

    data[dateType].forEach((date: string) => {
      result[date] = {
        customStyles: {
          container: {
            borderWidth: result[date] ? 4 : 0,
            borderColor: result[date]
              ? dateTypes[result[date].type]
              : 'transparent',
            backgroundColor: color,
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
        type: dateType,
      };
    });
  });

  return result;
};
