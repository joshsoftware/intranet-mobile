import {View, StyleSheet} from 'react-native';
import CircleView from './circleView';

const ProfileView = () => {
  return (
    <View style={styles.profileContainer}>
      <CircleView />
      <CircleView />
      <CircleView />
      <CircleView />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
export default ProfileView;
