import {ITimesheetSectionListItem, TimesheetStatus} from '../interface';

export function filterTimesheetsByStatus(
  data: ITimesheetSectionListItem[],
  targetStatus: TimesheetStatus,
) {
  let result: ITimesheetSectionListItem[] = [];

  result = data.reduce((acc, item) => {
    let tsList = item.data;

    tsList = tsList.filter(ts => (ts.status || 'Pending') === targetStatus);

    if (tsList.length > 0) {
      acc.push({
        title: item.title,
        data: tsList,
      });
    }

    return acc;
  }, result);

  return result;
}
