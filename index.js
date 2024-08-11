/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(()=>{});
messaging()
 .subscribeToTopic('peerly')

AppRegistry.registerComponent(appName, () => App);
