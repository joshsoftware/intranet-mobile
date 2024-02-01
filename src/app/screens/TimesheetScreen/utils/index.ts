import {FlatSectionListData} from '../component/FlatSectionList';

import {TimesheetStatus, TimesheetStatusFilter} from '../interface';

export const filterDataByStatus = <T>(
  data: FlatSectionListData<T>,
  status: TimesheetStatusFilter,
) => {
  const filteredData = data.filter(statusObj => {
    const statusObjStatus = statusObj.title as TimesheetStatus;

    switch (status) {
      case TimesheetStatusFilter.All:
        return true;
      case TimesheetStatusFilter.Pending:
        return (
          statusObjStatus === TimesheetStatus.Pending ||
          statusObjStatus === TimesheetStatus.ReviewPending ||
          statusObjStatus === TimesheetStatus.RejectedPending
        );
      case TimesheetStatusFilter.Approved:
        return statusObjStatus === TimesheetStatus.Approved;
      case TimesheetStatusFilter.Rejected:
        return statusObjStatus === TimesheetStatus.Rejected;
    }
  });

  sortData(filteredData);

  return filteredData;
};

const sortData = <T>(data: FlatSectionListData<T>) => {
  const statusWeight: Record<TimesheetStatus, number> = {
    [TimesheetStatus.RejectedPending]: 0,
    [TimesheetStatus.ReviewPending]: 1,
    [TimesheetStatus.Pending]: 2,
    [TimesheetStatus.Rejected]: 3,
    [TimesheetStatus.Approved]: 4,
  };

  data.sort((a, b) => {
    const aTitle = a.title as TimesheetStatus;
    const bTitle = b.title as TimesheetStatus;

    return statusWeight[aTitle] < statusWeight[bTitle]
      ? -1
      : statusWeight[aTitle] === statusWeight[bTitle]
      ? 0
      : 1;
  });

  data.forEach(statusObj =>
    statusObj.data.sort((a, b) =>
      a.title < b.title ? -1 : a.title === b.title ? 0 : 1,
    ),
  );
};
