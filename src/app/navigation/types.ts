import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  UserProfile: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Leave: undefined;
  Timesheet: undefined;
};

export type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;
