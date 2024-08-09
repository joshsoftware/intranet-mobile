/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

messaging()
 .subscribeToTopic('peerly')
 .then(() => console.log('Subscribed to peerly topic!'));

AppRegistry.registerComponent(appName, () => App);
