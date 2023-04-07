import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CustomTabView from './customTabView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';

const UserProfile = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.container}>
        <Text
          style={styles.text}
          onPress={() => {
            navigation.goBack();
          }}>
          Back
        </Text>
      </View>

      <CustomTabView />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    padding: 10,
  },
  circle: {
    height: 34,
    width: 34,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
  },
});

export default UserProfile;
