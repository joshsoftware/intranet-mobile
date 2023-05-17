import moment from 'moment';

export const dateFormate = (date: moment.MomentInput, format = 'DD-MM-YYYY') =>
  date ? moment(date).format(format) : '-';

export const startOfMonth = moment().startOf('month').toDate();

export const todaysDate = moment().toDate();

export const convertToMins = (timeStr: string) => {
  const time = moment(timeStr, 'HH:mm');
  const mins = time.hours() * 60 + time.minutes();
  return mins;
};
