import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Employee} from '../../app/screens/TimesheetScreen/interface';

export type RootDrawerParamList = {
  Login: undefined;
  UserTimesheet: Employee;
  Dashboard: undefined;
  Profile: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Leave: undefined;
  Timesheet: undefined;
};

export type DrawerParamList = {
  Main: undefined;
  UserProfile: undefined;
};

export type MainScreenNavigationProp = DrawerNavigationProp<
  RootDrawerParamList,
  'Dashboard'
>;

export type Navigation = {
  navigate: Function;
};
