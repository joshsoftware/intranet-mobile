const labelFormatter = (label: string) => {
  return label.split(/(?=[A-Z])/).length == label.length
    ? label
    : label.split(/(?=[A-Z])/).reduce((prev, curr) => {
        return prev + ' ' + curr;
      });
};

export default labelFormatter;
