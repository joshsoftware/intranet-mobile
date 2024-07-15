import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import HomeScreen from './HomeScreen/index';
import {useLoginPeerly} from './peerlyLogin.hook';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  PEERLY_SCREEN,
  APPRECIATION,
  APPRECIATION_DETAILS,
  PROFILE_DETAILS,
  APPRECIATION_SEARCH,
} from '../../constant/screenNames';
import AppreciationScreen from './AppreciationScreen';
import DetailsScreen from './DetailsScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';
const Stack = createNativeStackNavigator();

function PeerlyHomeScreen() {
  const {isLoading, isFetching, isError} = useLoginPeerly();
  if (isLoading || isFetching) {
    return (
      <View>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  if (isError) {
    <View>
      <Text>Something went Wrong</Text>
    </View>;
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={PEERLY_SCREEN}>
        <Stack.Screen name={PEERLY_SCREEN} component={HomeScreen} />
        <Stack.Screen name={APPRECIATION} component={AppreciationScreen} />
        <Stack.Screen name={APPRECIATION_DETAILS} component={DetailsScreen} />
        <Stack.Screen name={PROFILE_DETAILS} component={ProfileScreen} />
        <Stack.Screen name={APPRECIATION_SEARCH} component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default PeerlyHomeScreen;
