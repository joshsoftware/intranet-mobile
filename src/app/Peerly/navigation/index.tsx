import React from 'react';
import {ActivityIndicator, Text, SafeAreaView, StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen/index';
import {useLoginPeerly} from '../hooks/peerlyLogin.hook';
import Button from '../components/button/button';
function PeerlyScreen() {
  const {isLoading, isFetching, isError, refetch} = useLoginPeerly();

  if (isLoading || isFetching) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorMessage}>Oops, Something Went Wrong!</Text>
        <Text style={styles.errorMessage}>Plese Try After Sometime</Text>
        <Button title="retry" type="secondary" onPress={() => refetch()} />
      </SafeAreaView>
    );
  }

  return <HomeScreen />;
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    fontSize: 18,
    paddingBottom: 10,
  },
});

export default PeerlyScreen;
