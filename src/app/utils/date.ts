import moment from 'moment';

/**
 * Converts a date to the specified format.
 * @param date The date to be formatted (MomentInput).
 * @param format The desired date format (default: 'DD-MM-YYYY').
 * @returns The formatted date as a string, or '-' if the input date is invalid.
 */
export const dateFormate = (date: moment.MomentInput, format = 'DD-MM-YYYY') =>
  date ? moment(date).format(format) : '-';

/**
 * Retrieves the start of the current month as a Date object.
 * @returns The start of the current month as a Date object.
 */
export const startOfMonth = moment().startOf('month').toDate();

/**
 * Retrieves the current date as a Date object.
 * @returns The current date as a Date object.
 */
export const todaysDate = moment().toDate();

/**
 * Retrieves end of the current month as a Date object.
 * @returns The end of the current month as a Date object.
 */
export const endOfMonth = moment().endOf('month').toDate();

/**
 * Converts a time string to minutes.
 * @param timeStr The time string to be converted (format: 'HH:mm').
 * @returns The time converted to minutes.
 */
export const convertToMins = (timeStr: string) => {
  const time = moment(timeStr, 'HH:mm');
  const mins = time.hours() * 60 + time.minutes();
  return mins;
};

export const getMonthYearFromISO = (dateString: string) => {
  const date = moment(dateString);

  return {
    month: date.format('MMMM'),
    year: Number(date.format('YYYY')),
  };
};
