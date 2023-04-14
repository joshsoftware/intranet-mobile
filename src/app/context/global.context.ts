import React from 'react';

export type UserRole = 'Manager' | 'Employee';

export interface UserData {
  role: UserRole;
  userId: string;
}

export interface GlobalContextData {
  authToken: string;
  userData: UserData;
}

type ContextValue = [
  GlobalContextData | null,
  React.Dispatch<React.SetStateAction<GlobalContextData | null>>,
];

const defaultValue: ContextValue = [null, () => {}];

const GlobalContext = React.createContext<ContextValue>(defaultValue);

export default GlobalContext;
