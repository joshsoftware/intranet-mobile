import React, {useContext} from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';

import UserContext from '../context/user.context';
import AsyncStore from '../services/asyncStorage';
import {googleSignOut} from '../services/auth/google.auth';

const HomeScreen = () => {
  const [, setUser] = useContext(UserContext);

  const signOut = async () => {
    await googleSignOut();
    await AsyncStore.removeItem(AsyncStore.AUTH_TOKEN_KEY);
    setUser(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button title="Sign Out" onPress={signOut} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#707070',
  },
});

export default HomeScreen;
