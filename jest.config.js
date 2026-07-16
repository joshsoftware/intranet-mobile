module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: [
    './jest.setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|react-native-toast-message|react-native-reanimated|react-native-gesture-handler|@react-native-google-signin/google-signin|@react-native-firebase|@notifee/react-native|react-native-bootsplash|react-native-calendars|react-native-circular-progress-indicator)/',
  ],
};
