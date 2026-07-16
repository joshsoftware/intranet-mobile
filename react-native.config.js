const path = require('path');

module.exports = {
  project: {
    ios: {},
    android: {},
  },
  dependencies: {
    '@react-native-community/datetimepicker': {
      platforms: {
        android: {
          sourceDir: path.join(__dirname, 'node_modules/@react-native-community/datetimepicker/android'),
          packageImportPath: 'import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;',
          packageInstance: 'new RNDateTimePickerPackage()',
          libraryName: 'RNDateTimePickerCGen',
          cmakeListsPath: path.join(__dirname, 'node_modules/@react-native-community/datetimepicker/android/build/generated/source/codegen/jni/CMakeLists.txt'),
          componentDescriptors: [],
        },
      },
    },
    'react-native-config': {
      platforms: {
        android: {
          sourceDir: path.join(__dirname, 'node_modules/react-native-config/android'),
          packageImportPath: 'import com.lugg.RNCConfig.RNCConfigPackage;',
          packageInstance: 'new RNCConfigPackage()',
          libraryName: 'RNCConfigSpec',
          cmakeListsPath: path.join(__dirname, 'node_modules/react-native-config/android/build/generated/source/codegen/jni/CMakeLists.txt'),
          componentDescriptors: [],
        },
      },
    },
  },
  assets: ['./src/assets/fonts/'],
};