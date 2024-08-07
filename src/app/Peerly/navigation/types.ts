import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppreciationDetails} from '../services/home/types';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  AppreciationSearch: undefined;
  GiveAppreciation: undefined;
  Profile: {userId: number | undefined};
  AppreciationDetail: {
    cardId: number;
    appriciationList: AppreciationDetails[];
  };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type AppreciationSearchNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AppreciationSearch'
>;

export type GiveAppreciationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GiveAppreciation'
>;

export type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

export type AppreciationDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AppreciationDetail'
>;

export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

export type AppreciationDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'AppreciationDetail'
>;
