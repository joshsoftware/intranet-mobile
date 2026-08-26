import React from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

import AsyncStore from '../services/asyncStorage';
import UserContext from '../context/user.context';
import {googleSignOut} from '../services/auth/google.auth';

import {Cross} from '../constant/icons';
import colors from '../constant/colors';
import {RootStackParamList} from '../navigation/types';
import {USER_PROFILE_SCREEN} from '../constant/screenNames';

const DrawerContent = (props: any) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [, setUserContextData] = React.useContext(UserContext);
  const appVersion = DeviceInfo.getVersion();

  const goToProfile = () => {
    navigation.navigate(USER_PROFILE_SCREEN);
    closeDrawer();
  };

  const goToProvidesk = () => {
    Linking.openURL('https://providesk.joshsoftware.com/complaints').catch(
      () => {
        Alert.alert('Error', 'Could not open Providesk support page.');
      },
    );
  };

  const logout = async () => {
    Alert.alert('Alert', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          await googleSignOut();
          AsyncStore.removeItem('authToken');
          AsyncStore.removeItem('user_data');
          setUserContextData(null);
        },
      },
    ]);
  };

  const closeDrawer = () => {
    props.navigation.closeDrawer();
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
        <TouchableOpacity onPress={closeDrawer} style={styles.closeBtn}>
          <Cross width={26} height={26} fill={colors.PRIMARY} />
        </TouchableOpacity>
        <DrawerItem
          label="Profile"
          labelStyle={styles.label}
          onPress={goToProfile}
          style={styles.border}
        />
        <DrawerItem
          label="Providesk"
          labelStyle={styles.label}
          onPress={goToProvidesk}
          style={styles.border}
        />
        <DrawerItem
          label="Logout"
          labelStyle={styles.label}
          onPress={logout}
          style={styles.border}
        />
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Josh Intranet</Text>
        <Text style={styles.footerVersion}>v{appVersion}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  closeBtn: {
    marginVertical: 20,
    marginHorizontal: 10,
    alignItems: 'flex-end',
  },
  border: {
    borderBottomColor: colors.TEXT_INPUT_BORDER,
    borderBottomWidth: 1,
  },
  label: {
    textAlign: 'right',
  },
  footer: {
    paddingVertical: 30,
    // paddingHorizontal: 16,
    alignItems: 'center',
  },
  footerTitle: {
    color: colors.TERTIARY_TEXT,
    fontSize: 14,
    fontWeight: '600',
  },
  footerVersion: {
    marginTop: 4,
    color: colors.SECONDARY_TEXT,
    fontSize: 12,
  },
});
export default DrawerContent;
