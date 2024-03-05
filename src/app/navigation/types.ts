import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {AuthType, IntranetErrorCode} from '../services/api/login';
import {
  Employee,
  TimesheetStatus,
} from '../../app/screens/TimesheetScreen/interface';

export type RootStackParamList = {
  Login: undefined;
  UserTimesheet: Employee & {
    startDate: string;
    endDate: string;
    isAddModalOpen?: boolean;
    status?: TimesheetStatus;
    projectFilter?: string;
  };
  Drawer: undefined;
  Profile: undefined;
  LeaveDetail: {leaveID: number};
  LoginInstruction: {code: IntranetErrorCode; type: AuthType; email: string};
  OTPAuthentication: {email: string};
  UpdateVersion: undefined;
  NoVersion: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Leave: undefined;
  Timesheet: {startDate?: string; endDate?: string; isAddModalOpen?: boolean};
};

export type DrawerParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Drawer'
>;

export type LeaveDetailScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'LeaveDetail'
>;

export type OTPAuthenticationScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'OTPAuthentication'
>;

export type NoVersionScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'NoVersion'
>;

export type UserTimesheetRouteProp = RouteProp<
  RootStackParamList,
  'UserTimesheet'
>;

export type Navigation = {
  navigate: Function;
};

export type LoginInstructionScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'LoginInstruction'
>;
