import {Image, StyleSheet} from 'react-native';

const CustomImage = ({uri}: {uri: string}) => {
  return (
    <Image source={{uri: uri}} resizeMode="stretch" style={styles.image} />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
export default CustomImage;
