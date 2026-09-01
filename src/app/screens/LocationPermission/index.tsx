import React, {useEffect} from 'react';
import {
  BackHandler,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from '../../components/button';

import boxBackgroundImage from '../../../assets/images/boxBackground.png';
import colors from '../../constant/colors';
import fonts from '../../constant/fonts';
import {LocationPermissionStatus} from '../../utils/location';

type Props = {
  permissionStatus: LocationPermissionStatus | null;
  isRequesting: boolean;
  onAllow: () => void;
  onOpenSettings: () => void;
};

const LocationPermissionScreen = ({
  permissionStatus,
  isRequesting,
  onAllow,
  onOpenSettings,
}: Props) => {
  const needsSettings =
    permissionStatus === 'blocked' || permissionStatus === 'unavailable';

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => subscription.remove();
  }, []);

  return (
    <ImageBackground source={boxBackgroundImage} style={styles.imageContainer}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Location Required</Text>
          <Text style={styles.text}>
            Location access is required to use the Intranet app.
          </Text>
          <Text style={styles.text}>
            {needsSettings
              ? 'Location permission is blocked. Open Settings, enable location for Intranet, then return to the app.'
              : 'Please allow location access to continue.'}
          </Text>
        </View>

        <View style={styles.actions}>
          {needsSettings ? (
            <Button
              title="Open Settings"
              type="primary"
              onPress={onOpenSettings}
            />
          ) : (
            <Button
              title="Allow Location"
              type="primary"
              isLoading={isRequesting}
              disabled={isRequesting}
              onPress={onAllow}
            />
          )}
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
    fontFamily: fonts.ARIAL_BOLD,
  },
  text: {
    color: colors.SECONDARY,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    fontFamily: fonts.ARIAL,
  },
  actions: {
    gap: 12,
  },
});

export default LocationPermissionScreen;
