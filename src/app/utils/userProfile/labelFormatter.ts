const labelFormatter = (label: string) => {
  const req: string[] = label.split(/(?=[A-Z])/);

  return req.length == label.length
    ? label
    : req.reduce((prev, curr) => {
        return prev + ' ' + curr;
      });
};

export default labelFormatter;
