/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {enableScreens} from 'react-native-screens';
import App from './src/App';

enableScreens();
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(()=>{});
messaging()
 .subscribeToTopic('peerly')

AppRegistry.registerComponent(appName, () => App);
