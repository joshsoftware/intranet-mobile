import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Platform,
  Linking,
} from 'react-native';

import Button from '../../components/button';

import boxBackgroundImage from '../../../assets/images/boxBackground.png';
import colors from '../../constant/colors';
import {APPSTORE_URL, PLAYSTORE_URL} from '../../constant';

const UpdateVersionScreen = () => {
  const handleOpenStore = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(APPSTORE_URL);
    } else {
      Linking.openURL(PLAYSTORE_URL);
    }
  };

  return (
    <ImageBackground source={boxBackgroundImage} style={styles.imageContainer}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Update Needed</Text>
          <Text style={styles.text}>
            New update available! update now to continue using Intranet app
          </Text>
        </View>

        <View>
          <Button title="Open Store" type="primary" onPress={handleOpenStore} />
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
    color: colors.PRIMARY,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    color: colors.SECONDARY,
    textAlign: 'center',
  },
});

export default UpdateVersionScreen;
