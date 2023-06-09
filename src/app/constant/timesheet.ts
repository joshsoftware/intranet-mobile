const workHoursData = [
  {label: '30 mins', value: '0:30'},
  {label: '1 hour', value: '1:00'},
  {label: '1 hour 30 mins', value: '1:30'},
  {label: '2 hour', value: '2:00'},
  {label: '2 hour 30 mins', value: '2:30'},
  {label: '3 hour', value: '3:00'},
  {label: '3 hour 30 mins', value: '3:30'},
  {label: '4 hour', value: '4:00'},
  {label: '4 hour 30 mins', value: '4:30'},
  {label: '5 hour', value: '5:00'},
  {label: '5 hour 30 mins', value: '5:30'},
  {label: '6 hour', value: '6:00'},
  {label: '6 hour 30 mins', value: '6:30'},
  {label: '7 hour', value: '7:00'},
  {label: '7 hour 30 mins', value: '7:30'},
  {label: '8 hour', value: '8:00'},
  {label: '8 hour 30 mins', value: '8:30'},
  {label: '9 hour', value: '9:00'},
  {label: '9 hour 30 mins', value: '9:30'},
  {label: '10 hour', value: '10:00'},
  {label: '10 hour 30 mins', value: '10:30'},
  {label: '11 hour', value: '11:00 '},
  {label: '11 hour 30 mins', value: '11:30'},
  {label: '12 hour', value: '12:00'},
];

const timeConversion = {
  '0:30': '30',
  '1:00': '60',
  '1:30': '90',
  '2:00': '120',
  '2:30': '150',
  '3:00': '180',
  '3:30': '210',
  '4:00': '240',
  '4:30': '270',
  '5:00': '300',
  '5:30': '330',
  '6:00': '360',
  '6:30': '390',
  '7:00': '420',
  '7:30': '450',
  '8:00': '480',
  '8:30': '510',
  '9:00': '540',
  '9:30': '570',
  '10:00': '600',
  '10:30': '630',
  '11:00': '660',
  '11:30': '690',
  '12:00': '720',
};

export {workHoursData, timeConversion};
