import React, {useContext} from 'react';
import {ImageBackground, StyleSheet, View, Text} from 'react-native';
import {checkVersion} from 'react-native-check-version';

import Button from '../../components/button';
import UserContext from '../../context/user.context';

import colors from '../../constant/colors';
import {NoVersionScreenNavigationProp} from '../../navigation/types';
import {DRAWER, LOGIN_SCREEN, UPDATE_VERSION} from '../../constant/screenNames';

import boxBackgroundImage from '../../../assets/images/boxBackground.png';

const NoVersionScreen = (props: NoVersionScreenNavigationProp) => {
  const {navigation} = props;

  const [userContextData] = useContext(UserContext);

  const handleRetry = async () => {
    const version = await checkVersion();

    if (version.needsUpdate) {
      navigation.navigate(UPDATE_VERSION);
    } else if (userContextData) {
      navigation.navigate(DRAWER);
    } else {
      navigation.navigate(LOGIN_SCREEN);
    }
  };

  return (
    <ImageBackground source={boxBackgroundImage} style={styles.imageContainer}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Network Error</Text>
          <Text style={styles.text}>
            Could not fetch version info! Check network connection and try
            again.
          </Text>
        </View>

        <View>
          <Button title="Retry" type="primary" onPress={handleRetry} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
  },
  contentContainer: {
    gap: 10,
  },
  title: {
    color: colors.ERROR_RED,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    color: colors.SECONDARY,
    textAlign: 'center',
  },
});

export default NoVersionScreen;
