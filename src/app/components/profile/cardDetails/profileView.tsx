import {View, StyleSheet, Linking, Alert} from 'react-native';

import CircleView from '../../views/circleView';

const handlePress = async (uri: string) => {
  const supported = await Linking.canOpenURL(uri);

  if (supported) {
    console.log(uri);
    await Linking.openURL(uri);
  } else {
    Alert.alert(`This url ${uri} is not found !`);
  }
};

const ProfileView = () => {
  return (
    <View style={styles.profileContainer}>
      <CircleView
        uri="https://github.com/Sushant-2512"
        handlePress={handlePress}
      />
      <CircleView
        uri="https://github.com/Sushant-2512"
        handlePress={handlePress}
      />
      <CircleView uri="//rrr/s/s/" handlePress={handlePress} />
      <CircleView
        uri="https://reactnavigation.org/docs/5.x/tab-based-navigation"
        handlePress={handlePress}
      />
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
