import colors from '../../constant/colors';
import {GetTeamMembersLeavesResponse} from '../../services/home/types';

const dateTypes: Record<string, {color: string; type: string}> = {
  approved: {
    color: colors.LIGHT_GREEN_BACKGROUND,
    type: 'approved',
  },
  not_filled: {
    color: colors.LIGHT_RED_BACKGROUND,
    type: 'not_filled',
  },
  rejected: {
    color: colors.LIGHT_RED_BACKGROUND,
    type: 'rejected',
  },
  pending: {
    color: colors.YELLOW_BACKGROUND,
    type: 'pending',
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

  ['holidays', 'leaves'].forEach(dateType => {
    const {color, type} = dateTypes[dateType];

    data[dateType].forEach(date => {
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

  ['approved', 'not_filled', 'pending', 'rejected'].forEach(dateType => {
    const {color, type} = dateTypes[dateType];

    data[dateType].forEach(date => {
      let borderColor = 'transparent';
      let borderWidth = 0;

      if (result[date]) {
        borderWidth = 2;

        switch (result[date].type) {
          case 'leave':
            borderColor = dateTypes.leaves.color;
            break;
          case 'holiday':
            borderColor = dateTypes.holidays.color;
            break;

          default:
            break;
        }
      }

      result[date] = {
        customStyles: {
          container: {
            borderWidth: borderWidth,
            borderColor: borderColor,
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

export const filterWFHFromLeaves = (
  data: GetTeamMembersLeavesResponse['data'],
) => {
  return data.filter(({leave_type}) => leave_type !== 'WFH');
};
