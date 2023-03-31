import {Linking, Alert} from 'react-native';

const urlHandler = async (uri: string) => {
  const supported = await Linking.canOpenURL(uri);

  if (supported) {
    await Linking.openURL(uri);
  } else {
    Alert.alert(`This url ${uri} is not found !`);
  }
};

export default urlHandler;
