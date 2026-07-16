/**
 * @format
 */

import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens(false);
import './src/app/navigation/reanimatedPolyfill';

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(() => { });
messaging().subscribeToTopic('peerly');

AppRegistry.registerComponent(appName, () => App);
