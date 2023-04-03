import {View, StyleSheet} from 'react-native';

import CircleView from './circleView';

const ProfileView = () => {
  return (
    <View style={styles.profileContainer}>
      <CircleView uri="https://github.com/Sushant-2512" />
      <CircleView uri="https://github.com/Sushant-2512" />
      <CircleView uri="https://reactnavigation.org/docs/5.x/tab-based-navigation" />
      <CircleView uri="https://reactnavigation.org/docs/5.x/tab-based-navigation" />
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
