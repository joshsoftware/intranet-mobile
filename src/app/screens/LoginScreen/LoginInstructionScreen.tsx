import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Text,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Button from '../../components/button';
import Header from '../../components/header';
import SigninSuccessCard from './components/SigninSuccessCard';
import WarningMessageCard from './components/WarningMessageCard';
import InstructionCard from './components/InstructionCard';

import boxBackgroundImage from '../../../assets/images/boxBackground.png';

import {
  LoginInstructionScreenNavigationProp,
  RootStackParamList,
} from '../../navigation/types';

function LoginInstructionScreen(props: LoginInstructionScreenNavigationProp) {
  const {route} = props;
  const params = route.params;

  const {code, type, email} = params;

  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ImageBackground source={boxBackgroundImage} style={styles.imageContainer}>
      <View style={[styles.container, {paddingBottom: insets.bottom}]}>
        <Header type="primary" />
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Action Needed</Text>
        </View>

        <ScrollView style={styles.contentContainer}>
          <SigninSuccessCard type={type} email={email} />

          <WarningMessageCard code={code} />

          <InstructionCard type={type} code={code} />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            type="primary"
            title="Back to Login"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerContainer: {
    marginTop: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
});

export default LoginInstructionScreen;
