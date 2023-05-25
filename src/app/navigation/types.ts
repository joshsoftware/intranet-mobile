import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {Employee} from '../../app/screens/TimesheetScreen/interface';

export type RootStackParamList = {
  Login: undefined;
  UserTimesheet: Employee;
  Drawer: undefined;
  Profile: undefined;
  LeaveDetail: {leaveID: number};
};

export type MainTabParamList = {
  Home: undefined;
  Leave: undefined;
  Timesheet: undefined;
};

export type DrawerParamList = {
  Main: undefined;
};

export type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Drawer'
>;

export type LeaveDetailScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'LeaveDetail'
>;

export type Navigation = {
  navigate: Function;
};
