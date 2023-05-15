import moment from 'moment';

export const dateFormate = (date: moment.MomentInput, format = 'l') =>
  date ? moment(date).format(format) : '-';

export const startOfMonth = moment().startOf('month').toDate();

export const todaysDate = moment().toDate();
