const workHoursData = [
  {label: '30 mins', value: '30 mins'},
  {label: '1 hour', value: '1 hour'},
  {label: '1 hour 30mins', value: '1 hour 30mins'},
  {label: '2 hour', value: '2 hour'},
  {label: '2 hour 30mins', value: '2 hour 30mins'},
  {label: '3 hour', value: '3 hour'},
  {label: '3 hour 30mins', value: '3 hour 30 mins'},
  {label: '4 hour', value: '4 hour'},
  {label: '4 hour 30mins', value: '4 hour 30 mins'},
  {label: '5 hour', value: '5 hour'},
  {label: '5 hour 30mins', value: '5 hour 30 mins'},
  {label: '6 hour', value: '6 hour'},
  {label: '6 hour 30mins', value: '6 hour 30 mins'},
  {label: '7 hour', value: '7 hour'},
  {label: '7 hour 30mins', value: '7 hour 30 mins'},
  {label: '8 hour', value: '8 hour'},
  {label: '8 hour 30mins', value: '8 hour 30 mins'},
  {label: '9 hour', value: '9 hour'},
  {label: '9 hour 30mins', value: '9 hour 30 mins'},
  {label: '10 hour', value: '10 hour'},
  {label: '10 hour 30mins', value: '10 hour 30 mins'},
  {label: '11 hour', value: '11 hour'},
  {label: '11 hour 30mins', value: '11 hour 30 mins'},
  {label: '12 hour', value: '12 hour'},
];

const employeeList = [
  {
    employee_id: '101',
    name: 'Abhijit Kasbe',
    email: 'abhijit.kasbe@joshsoftware.com',
  },
  {
    employee_id: '102',
    name: 'Abhijit Kasbe',
    email: 'abhijit.kasbe@joshsoftware.com',
  },
  {
    employee_id: '103',
    name: 'Abhijit Kasbe',
    email: 'abhijit.kasbe@joshsoftware.com',
  },
  {
    employee_id: '104',
    name: 'Abhijit Kasbe',
    email: 'abhijit.kasbe@joshsoftware.com',
  },
  {
    employee_id: '105',
    name: 'Abhijit Kasbe',
    email: 'abhijit.kasbe@joshsoftware.com',
  },
  {
    employee_id: '106',
    name: 'Abhijit Kasbe',
    email: 'abhijit.kasbe@joshsoftware.com',
  },
  {
    employee_id: '107',
    name: 'Abhijit Kasbe',
    email: 'abhijit.kasbe@joshsoftware.com',
  },
];

const projectListData = [
  {label: 'AWS Training', value: 'AWS Training'},
  {
    label: 'Banor Capital- Staff Augmentation',
    value: 'Banor Capital- Staff Augmentation',
  },
  {label: 'Buzbe- Shopify App', value: 'Buzbe- Shopify App'},
  {label: 'Intranet', value: 'Intranet'},
];

const timesheetListData = {
  total_pages: 0,
  page_no: 0,
  projects: 3,
  total_work: '2D 30m (16h 30m)',
  leaves: 0,
  data: [
    {
      title: 'AWS Training',
      data: [
        {
          timesheet_id: '201344',
          date: '2023-03-21',
          description: 'wdwd',
          work_in_hours: '1:30',
        },
        {
          timesheet_id: '201341',
          date: '2023-03-29',
          description: 'Working on it',
          work_in_hours: '5:00',
        },
        {
          timesheet_id: '201340',
          date: '2023-03-30',
          description: 'hello world',
          work_in_hours: '3:00',
        },
      ],
    },
    {
      title: 'Banor Capital- Staff Augmentation',
      data: [
        {
          timesheet_id: '201342',
          date: '2023-03-30',
          description: 'blah',
          work_in_hours: '4:30',
        },
      ],
    },
    {
      title: 'Buzbe- Shopify App',
      data: [
        {
          timesheet_id: '201343',
          date: '2023-03-30',
          description: 'dwdd',
          work_in_hours: '2:30',
        },
      ],
    },
    {
      title: 'AWS Training',
      data: [
        {
          timesheet_id: '201344',
          date: '2023-03-21',
          description: 'wdwd',
          work_in_hours: '1:30',
        },
        {
          timesheet_id: '201341',
          date: '2023-03-29',
          description: 'Working on it',
          work_in_hours: '5:00',
        },
        {
          timesheet_id: '201340',
          date: '2023-03-30',
          description: 'hello world',
          work_in_hours: '3:00',
        },
      ],
    },
    {
      title: 'Banor Capital- Staff Augmentation',
      data: [
        {
          timesheet_id: '201342',
          date: '2023-03-30',
          description: 'blah',
          work_in_hours: '4:30',
        },
      ],
    },
    {
      title: 'Buzbe- Shopify App',
      data: [
        {
          timesheet_id: '201343',
          date: '2023-03-30',
          description: 'dwdd',
          work_in_hours: '2:30',
        },
      ],
    },
    {
      title: 'AWS Training',
      data: [
        {
          timesheet_id: '201344',
          date: '2023-03-21',
          description: 'wdwd',
          work_in_hours: '1:30',
        },
        {
          timesheet_id: '201341',
          date: '2023-03-29',
          description: 'Working on it',
          work_in_hours: '5:00',
        },
        {
          timesheet_id: '201340',
          date: '30-03-2023',
          description: 'hello world',
          work_in_hours: '3:00',
        },
      ],
    },
    {
      title: 'Banor Capital- Staff Augmentation',
      data: [
        {
          timesheet_id: '201342',
          date: '2023-03-30',
          description: 'blah',
          work_in_hours: '4:30',
        },
      ],
    },
    {
      title: 'Buzbe- Shopify App',
      data: [
        {
          timesheet_id: '201343',
          date: '2023-03-30',
          description: 'dwdd',
          work_in_hours: '2:30',
        },
      ],
    },
  ],
};

export {workHoursData, employeeList, projectListData, timesheetListData};
