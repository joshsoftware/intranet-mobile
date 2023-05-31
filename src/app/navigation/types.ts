import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Employee} from '../../app/screens/TimesheetScreen/interface';

export type RootStackParamList = {
  Login: undefined;
  UserTimesheet: Employee & {startDate: string; endDate: string};
  Drawer: undefined;
  Profile: undefined;
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

export type Navigation = {
  navigate: Function;
};
