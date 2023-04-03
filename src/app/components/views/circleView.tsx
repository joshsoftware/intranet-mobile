import {StyleSheet, View, TouchableOpacity, Linking, Alert} from 'react-native';

import {borderStyles} from '../../../styles';
import CustomImage from '../atoms/customImage';

const handlePress = async (uri: string) => {
  const supported = await Linking.canOpenURL(uri);

  if (supported) {
    console.log(uri);
    await Linking.openURL(uri);
  } else {
    Alert.alert(`Don't know how to open this URL: ${uri}`);
  }
};

const CircleView = ({uri}: {uri: string}) => {
  console.log(uri);
  return (
    <TouchableOpacity
      style={borderStyles.circleBorder}
      onPress={() => handlePress(uri)}>
      <CustomImage
        uri={
          'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/800px-LinkedIn_icon_circle.svg.png'
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default CircleView;
