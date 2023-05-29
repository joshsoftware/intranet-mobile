import React from 'react';

export type UserRole =
  | 'Admin'
  | 'Deployment'
  | 'HR'
  | 'Finance'
  | 'Leader'
  | 'Manager'
  | 'Employee'
  | 'Intern'
  | 'Consultant';

export interface UserData {
  role: UserRole;
  userId: string;
}

export interface UserContextData {
  authToken: string;
  userData: UserData;
}

type ContextValue = [
  UserContextData | null,
  React.Dispatch<React.SetStateAction<UserContextData | null>>,
];

const defaultValue: ContextValue = [null, () => {}];

const UserContext = React.createContext<ContextValue>(defaultValue);

export default UserContext;
