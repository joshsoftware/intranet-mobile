import React from 'react';
import {View, StyleSheet, Linking, Alert} from 'react-native';

import CircleView from '../../views/circleView';

import {socialDetailsType} from '../../../types';

const handlePress = async (uri: string) => {
  const supported = await Linking.canOpenURL(uri);

  if (supported) {
    console.log(uri);
    await Linking.openURL(uri);
  } else {
    Alert.alert(`This url ${uri} is not found !`);
  }
};

type Props = {
  data: socialDetailsType;
};

const ProfileView = ({data}: Props) => {
  return (
    <View style={styles.profileContainer}>
      {data.map((item, index) =>
        item.uri ? (
          <CircleView
            key={index}
            data={{name: item.name}}
            uri={item.uri}
            handlePress={handlePress}
          />
        ) : undefined,
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
});
export default ProfileView;
