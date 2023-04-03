import {Image, ImageResizeMode, ImageStyle, StyleSheet} from 'react-native';

type Props = {
  uri: string;
  imageStyle?: ImageStyle;
  resizeMode?: ImageResizeMode;
};
const CustomImage = ({uri, imageStyle, resizeMode = 'stretch'}: Props) => {
  return (
    <Image
      source={{uri: uri}}
      resizeMode={resizeMode}
      style={[styles.image, imageStyle]}
    />
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
export default CustomImage;
