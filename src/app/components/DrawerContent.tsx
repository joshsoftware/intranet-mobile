import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import AsyncStore from '../services/asyncStorage';
import UserContext from '../context/user.context';
import {googleSignOut} from '../services/auth/google.auth';

import {Cross} from '../constant/icons';
import colors from '../constant/colors';
import {USER_PROFILE_SCREEN} from '../constant/screenNames';

const DrawerContent = (props: any) => {
  const [, setUserContextData] = React.useContext(UserContext);
  const logout = async () => {
    await googleSignOut();
    AsyncStore.removeItem('authToken');
    AsyncStore.removeItem('user_data');
    setUserContextData(null);

    closeDrawer();
  };

  const closeDrawer = () => {
    props.navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={closeDrawer} style={styles.closeBtn}>
        <Cross width={26} height={26} fill={colors.PRIMARY} />
      </TouchableOpacity>
      <DrawerItem
        label="Profile"
        labelStyle={styles.label}
        onPress={() => props.navigation.navigate(USER_PROFILE_SCREEN)}
        style={styles.border}
      />
      <DrawerItem
        label="Logout"
        labelStyle={styles.label}
        onPress={logout}
        style={styles.border}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
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
});

export default DrawerContent;
