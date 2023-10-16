export const LOGIN_ROUTE = '/api/mobile/v1/login_in';
export const EMAIL_OTP = '/api/mobile/v1/email_otp';

export const USER_PROFILE_ROUTE = '/api/mobile/v1/user_details';

export const GET_ALL_SKILL_ROUTE = '/api/mobile/v1/skills_list';
export const UPDATE_SKILL_ROUTE = '/api/mobile/v1/update_skills';

export const GET_EMPLOYEE_LIST_ROUTE = '/api/mobile/v1/time_sheets/emp_list';
export const GET_TIMESHEET_ROUTE = '/api/mobile/v1/time_sheets/show_time_sheet';
export const GET_PROJECT_LIST_ROUTE =
  '/api/mobile/v1/time_sheets/project_list/:user_id';
export const POST_TIMESHEET_ROUTE = '/api/mobile/v1/time_sheets/add_time_sheet';
export const PUT_TIMESHEET_ROUTE =
  '/api/mobile/v1/time_sheets/update_time_sheet';
export const DELETE_TIMESHEET_ROUTE =
  '/api/mobile/v1/time_sheets/delete_time_sheet';

export const MANAGER_LEAVE_LIST_ROUTE = '/api/mobile/v1/leaves/management';
export const LEAVE_LIST_ROUTE = '/api/mobile/v1/leaves/employee';
export const LEAVE_DETAIL_ROUTE = '/api/mobile/v1/leaves/employee/details';

export const ALL_PROJECTS_ROUTE = '/api/mobile/v1/leaves/all_project_list';
export const USERS_LIST_LEAVE_ROUTE = '/api/mobile/v1/employees_for_leaves';

export const HOME_CALENDAR_ROUTE =
  '/api/mobile/v1/time_sheets/timesheet_calender';

export const TEAM_MEMBERS_UPCOMING_LEAVES_ROUTE =
  '/api/mobile/v1/leaves/upcoming_users_leaves';

export const TEAM_MEMBERS_UPCOMING_BIRTHDAYS_ROUTE =
  '/api/mobile/v1/employee_birthdays';
