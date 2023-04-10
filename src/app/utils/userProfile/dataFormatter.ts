const dataFormatter = (data: string | string[]) => {
  if (data === '' || data === null || data === undefined) return '-';
  else if (typeof data === 'boolean') return data ? 'Yes' : 'No';
  else if (Array.isArray(data)) return data.toString();
  else return data;
};

export default dataFormatter;
