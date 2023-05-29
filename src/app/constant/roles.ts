export const roles = {
  ADMIN: 'Admin',
  DEPLOYMENT: 'Deployment',
  HR: 'HR',
  FINANCE: 'Finance',
  LEADER: 'Leader',
  MANAGER: 'Manager',
  EMPLOYEE: 'Employee',
  INTERN: 'Intern',
  CONSULTANT: 'Consultant',
};

export const MANAGEMENT_GROUP = [
  roles.ADMIN,
  roles.DEPLOYMENT,
  roles.HR,
  roles.LEADER,
  roles.MANAGER,
];

export const DEPLOYMENT_GROUP = [roles.ADMIN, roles.DEPLOYMENT];

export const EMPLOYEE_GROUP = [
  roles.EMPLOYEE,
  roles.CONSULTANT,
  roles.INTERN,
  roles.FINANCE,
];
