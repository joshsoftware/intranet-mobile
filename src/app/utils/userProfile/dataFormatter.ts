const dataFormatter = (data: string | string[]) =>
  data === '' ? '-' : typeof data == 'boolean' ? (data ? 'Yes' : 'No') : data;

export default dataFormatter;
