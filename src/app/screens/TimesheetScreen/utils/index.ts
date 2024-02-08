import {FlatSectionListData} from '../component/FlatSectionList';

import {
  Employee,
  Timesheet,
  TimesheetStatus,
  TimesheetStatusFilter,
} from '../interface';

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

export const toTimesheetFilterStatus = (status: TimesheetStatus) => {
  switch (status) {
    case TimesheetStatus.Approved:
      return TimesheetStatusFilter.Approved;
    case TimesheetStatus.Rejected:
      return TimesheetStatusFilter.Rejected;
    case TimesheetStatus.Pending:
    case TimesheetStatus.ReviewPending:
    case TimesheetStatus.RejectedPending:
      return TimesheetStatusFilter.Pending;
    default:
      return TimesheetStatusFilter.All;
  }
};

export const filterDataBySearch = (
  data: FlatSectionListData<Employee>,
  userText: string,
  projectText: string,
) => {
  data = data.map(statusObj => ({
    title: statusObj.title,
    data: statusObj.data.map(projectObj => ({
      title: projectObj.title,
      id: projectObj.id,
      data: projectObj.data.filter(
        userObj =>
          userObj.name.toLowerCase().includes(userText.toLowerCase()) ||
          userObj.email.toLowerCase().includes(userText.toLowerCase()),
      ),
    })),
  }));

  data = data.map(statusObj => ({
    title: statusObj.title,
    data: statusObj.data.filter(
      projectObj =>
        projectObj.title.toLowerCase().includes(projectText.toLowerCase()) &&
        projectObj.data.length > 0,
    ),
  }));

  data = data.filter(statusObj => statusObj.data.length > 0);

  sortData(data);

  return data;
};

export const filterTimesheetBySearch = (
  data: FlatSectionListData<Timesheet>,
  projectText: string,
) => {
  data = data.map(statusObj => ({
    title: statusObj.title,
    data: statusObj.data.filter(
      projectObj =>
        projectObj.title.toLowerCase().includes(projectText.toLowerCase()) &&
        projectObj.data.length > 0,
    ),
  }));

  data = data.filter(statusObj => statusObj.data.length > 0);

  sortData(data);

  return data;
};
