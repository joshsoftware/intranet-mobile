import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppreciationDetails} from '../services/home/types';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  PeerlyHome: undefined;
  AppreciationSearch: undefined;
  GiveAppreciation: undefined;
  PeerlyProfile: {userId: number | undefined};
  AppreciationDetail: {
    cardId: number;
    appriciationList: AppreciationDetails[];
  };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PeerlyHome'
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
  'PeerlyProfile'
>;

export type AppreciationDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AppreciationDetail'
>;

export type ProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  'PeerlyProfile'
>;

export type AppreciationDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'AppreciationDetail'
>;
