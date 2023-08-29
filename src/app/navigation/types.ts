import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {Employee} from '../../app/screens/TimesheetScreen/interface';

export type RootStackParamList = {
  Login: undefined;
  UserTimesheet: Employee & {
    startDate: string;
    endDate: string;
    isAddModalOpen?: boolean;
  };
  Drawer: NavigatorScreenParams<DrawerParamList>;
  Profile: undefined;
  LeaveDetail: {leaveID: number};
  TimesheetDetail: {timesheetID: string; timesheetData: string};
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

export type TimesheetDetailScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'TimesheetDetail'
>;

export type UserTimesheetRouteProp = RouteProp<
  RootStackParamList,
  'UserTimesheet'
>;

export type Navigation = {
  navigate: Function;
};
