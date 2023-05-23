import {ISO_DATE_FROMAT} from '../../constant/date';
import {
  Timesheet,
  ITimesheetSectionListItem,
} from '../../screens/TimesheetScreen/interface';
import {dateFormate} from '../date';

/**
 * Converts the failed timesheets response received from server into a specific format.
 * @param timesheetSections The array of timesheet sections.
 * @param failedTimesheets An object containing failed timesheets data.
 * @returns The converted timesheets data in the desired format.
 */
export const convertFailedTimesheetsResponse = (
  timesheetSections: ITimesheetSectionListItem[],
  failedTimesheets: {
    [key: string]: string[];
  },
) => {
  const res = {} as {[key: string]: Timesheet[]};

  timesheetSections.forEach(section => {
    if (section.title in failedTimesheets) {
      res[section.title] = [];
      section.data.forEach(timesheet => {
        if (
          failedTimesheets[section.title].includes(
            dateFormate(timesheet.date, ISO_DATE_FROMAT),
          )
        ) {
          res[section.title].push(timesheet);
        }
      });
    }
  });

  const output = Object.entries(res).map(([key, val]) => ({
    title: key,
    data: val,
  }));

  return output as ITimesheetSectionListItem[];
};
