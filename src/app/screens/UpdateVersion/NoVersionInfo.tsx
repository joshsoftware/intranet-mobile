import React, {useContext, useState} from 'react';
import {ImageBackground, StyleSheet, View, Text} from 'react-native';
import {checkVersion} from 'react-native-check-version';
import DeviceInfo from 'react-native-device-info';

import Button from '../../components/button';
import VersionContext from '../../context/version.context';

import toast from '../../utils/toast';
import colors from '../../constant/colors';
import {isVersionGreater} from '../../utils/appVersion';

import boxBackgroundImage from '../../../assets/images/boxBackground.png';

const NoVersionScreen = () => {
  const [, setVersionContextData] = useContext(VersionContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleRetry = async () => {
    try {
      setIsLoading(true);

      const currentVersion = DeviceInfo.getVersion();
      const version = await checkVersion({
        bundleId: DeviceInfo.getBundleId(),
        currentVersion,
      });

      setIsLoading(false);

      if (version.version === null) {
        toast('Could not fetch version info!', 'error');
      } else {
        setVersionContextData({
          ...version,
          needsUpdate: isVersionGreater(version.version, currentVersion),
        });
      }
    } catch {
      toast('Could not fetch version info!', 'error');
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={boxBackgroundImage} style={styles.imageContainer}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Network Error</Text>
          <Text style={styles.text}>Could not fetch version info!</Text>
          <Text style={styles.text}>
            Check network connection and try again.
          </Text>
        </View>

        <View>
          <Button
            title="Retry"
            type="primary"
            isLoading={isLoading}
            onPress={handleRetry}
          />
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
