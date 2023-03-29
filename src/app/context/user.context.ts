import React from 'react';

export interface UserData {
  token: string;
}

type ContextValue = [
  UserData | null,
  React.Dispatch<React.SetStateAction<UserData | null>>,
];

const defaultValue: ContextValue = [null, () => {}];

const UserContext = React.createContext<ContextValue>(defaultValue);

export default UserContext;
